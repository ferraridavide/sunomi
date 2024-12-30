import { timeStamp } from "console";
import prisma from "../data/prisma";
import { v4 as uuidv4 } from "uuid";

export class VideoService {
  /**
   * Get all public videos with pagination
   * @param skip - Number of videos to skip
   * @param take - Number of videos to take
   */
  static async getAllVideos(skip: number, take: number) {
    return await prisma.videos.findMany({
      where: { status: "PUBLIC" },
      orderBy: {
        uploadDate: "desc",
      },
      skip: skip,
      take: take
    });
  }

  /**
   * Get a video by its ID and check if the user has liked it
   * @param videoId - ID of the video
   * @param userId - ID of the user
   */
  static async getVideoById(videoId: string, userId: string) {
    const video = await prisma.videos.findUnique({
      where: { id: videoId, status: "PUBLIC" },
      include: {
        likes: {
          where: {
            userId: userId,
          },
          take: 1,
        },
      },
    });

    const videoCounts = await prisma.videos.findUnique({
      where: { id: videoId, status: "PUBLIC" },
      select: {
        _count: {
          select: {
            likes: true,
            views: true,
          },
        },
      },
    });

    if (!video || !videoCounts) return null;

    const totalLikes = videoCounts._count.likes;
    const userHasLiked = video.likes.length === 1;
    const totalViews = videoCounts._count.views;

    return {
      ...video,
      totalLikes,
      userHasLiked,
      totalViews,
    };
  }

  /**
   * Retrieve all public videos by a specific user
   * @param userId - ID of the user
   */
  static async getVideosByUserId(userId: string) {
    try {
      const videos = await prisma.videos.findMany({
        where: {
          userId: userId,
          status: "PUBLIC",
        },
        orderBy: {
          uploadDate: "desc",
        },
      });

      return videos;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query failed");
    }
  }

  /**
   * Search for public videos by title keywords
   * @param words - Array of keywords to search for
   */
  static async searchVideos(words: string[]) {
    if (words.length === 0) throw new Error("Empty search words"); // Guard against empty input

    const searchConditions = words.map((word) => ({
      title: {
        contains: word,
      },
    }));
    console.log("Search conditions:", searchConditions);

    try {
      return await prisma.videos.findMany({
        where: {
          OR: searchConditions,
          status: "PUBLIC",
        },
      });
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query failed");
    }
  }

  /**
   * Add or remove like from a video and return the updated number of likes
   * @param videoId - ID of the video
   * @param userId - ID of the user
   * @param isLiking - Boolean indicating if the user is liking or unliking the video
   */
  static async likeVideo(videoId: string, userId: string, isLiking: boolean) {
    try {
      if (isLiking) {
        await prisma.likes.upsert({
          where: {
            videoId_userId: {
              videoId,
              userId,
            },
          },
          create: {
            videoId,
            userId,
          },
          update: {},
        });
      } else {
        await prisma.likes.delete({
          where: {
            videoId_userId: {
              videoId,
              userId,
            },
          },
        }).catch(() => null); // Return null if like doesn't exist
      }

      const updatedLikesCount = await prisma.likes.count({
        where: {
          videoId,
        },
      });

      return updatedLikesCount;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query failed");
    }
  }

  /**
   * Add a comment to a video
   * @param videoId - ID of the video
   * @param userId - ID of the user
   * @param content - Content of the comment
   */
  static async addComment(videoId: string, userId: string, content: string) {
    return await prisma.comments.create({
      data: {
        id: uuidv4(),
        videoId,
        userId,
        content,
        date: new Date(),
      },
    });
  }

  /**
   * Get paginated comments for a video
   * @param videoId - ID of the video
   * @param skip - Number of comments to skip
   * @param take - Number of comments to take
   */
  static async getComments(videoId: string, skip: number, take: number) {
    try {
      const video = await prisma.videos.findUnique({
        where: { id: videoId, status: "PUBLIC" },
        include: {
          comments: {
            orderBy: {
              date: "desc",
            },
            skip: skip,
            take: take,
            include: {
              users: {
                select: {
                  userId: true,
                  profilePictureUrl: true,
                },
              },
            },
          },
        },
      });

      if (!video) return [];

      return video.comments.map((comment) => ({
        id: comment.id,
        user: {
          userId: comment.users.userId,
          profilePictureUrl: comment.users.profilePictureUrl,
        },
        text: comment.content,
        timeStamp: comment.date.toISOString(),
      }));
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query failed");
    }
  }

  /**
   * Increment the view count for a video
   * @param videoId - ID of the video
   * @param userId - ID of the user
   */
  static async incrementViewCount(videoId: string, userId: string) {
    return await prisma.views.upsert({
      where: {
        videoId_userId: {
          videoId,
          userId,
        },
      },
      create: {
        videoId,
        userId,
      },
      update: {},
    });
  }

  /**
   * Add or remove subscription from a video and return the updated subscription status
   * @param videoId - ID of the video
   * @param userId - ID of the user
   * @param isUserSubscribed - Boolean indicating if the user is subscribed or unsubscribed
   */
  static async subscribeVideo(videoId: string, userId: string, isUserSubscribed: boolean) {
    try {
      if (isUserSubscribed) {
        await prisma.subscriptions.upsert({
          where: {
            subscriberId_subscribedToId: {
              subscriberId: userId,
              subscribedToId: videoId,
            },
          },
          create: {
            subscriberId: userId,
            subscribedToId: videoId,
          },
          update: {},
        });
      } else {
        await prisma.subscriptions.delete({
          where: {
            subscriberId_subscribedToId: {
              subscriberId: userId,
              subscribedToId: videoId,
            },
          },
        }).catch(() => null);
      }

      const isSubscribed = await prisma.subscriptions.findUnique({
        where: {
          subscriberId_subscribedToId: {
            subscriberId: userId,
            subscribedToId: videoId,
          },
        },
      });

      return !!isSubscribed;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query failed");
    }
  }

  /**
   * Get videos from subscriptions with pagination
   * @param subscriberId - ID of the subscriber
   * @param skip - Number of videos to skip
   * @param take - Number of videos to take
   */
  static async getSubscriptionVideos(subscriberId: string, skip: number, take: number) {
    return await prisma.videos.findMany({
      where: {
        status: "PUBLIC",
        users: {
          subscriptions_subscriptions_subscriberIdTousers: {
            some: {
              subscriberId: subscriberId
            }
          }
        }
      },
      orderBy: {
        uploadDate: "desc",
      },
      skip: skip,
      take: take
    });
  }

  /**
   * Check if a user is subscribed to the channel of the video uploader
   * @param videoId - ID of the video
   * @param userId - ID of the user
   */
  static async isUserSubscribedToUploader(videoId: string, userId: string) {
    const video = await prisma.videos.findUnique({
      where: { id: videoId, status: "PUBLIC" },
      select: { userId: true },
    });

    if (!video) throw new Error("Video not found");

    const subscription = await prisma.subscriptions.findUnique({
      where: {
        subscriberId_subscribedToId: {
          subscriberId: userId,
          subscribedToId: video.userId,
        },
      },
    });

    return !!subscription;
  }
}