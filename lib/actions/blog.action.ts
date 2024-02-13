'use server'

import { connectionToDatabase } from '../mongoose'
import Tag from '@/database/tags.question'
import mongoose from 'mongoose'
import { CreateBlogParams, DeleteBlogParams, EditBlogParams, GetBlogParams, ViewBlogParams, blogVoteParams } from './shared.types'
import Blog from '@/database/blog.model'
import User from '@/database/user.question'
import { revalidatePath } from 'next/cache'
import Interaction from '@/database/interaction.model'
import Comments from '@/database/comment.model'

export async function createBlogPost (params:CreateBlogParams) {
  try {
    connectionToDatabase()

    const { title, content, tags, author } = params // path

    const blog = await Blog.create({
      title,
      content,
      tags: [], // Initialize tags as an empty array
      author
    })

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { blogs: blog._id } },
        { upsert: true, new: true }
      )
      tagDocuments.push(existingTag._id)
    }

    // tagDocuments to an array of ObjectId
    const tagsAsObjectId = tagDocuments.map(
      (tagId) => new mongoose.Types.ObjectId(tagId)
    )

    await Blog.findByIdAndUpdate(
      blog._id,
      {
        $push: { tags: { $each: tagsAsObjectId } }
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}

// getting all the post

export async function getPosts (params:GetBlogParams) {
  try {
    connectionToDatabase()

    const posts = await Blog.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { posts }
  } catch (error) {
    console.log(error)
  }
}

export async function getPostById (params: ViewBlogParams) {
  try {
    connectionToDatabase()
    const { postId } = params

    const post = await Blog.findById(postId)
      .populate({
        path: 'tags',
        model: Tag,
        select: '_id name'
      })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture'
      })

    return post
  } catch (error) {
    console.log(error)
  }
}

export async function upvotePost (params:blogVoteParams) {
  try {
    connectionToDatabase()

    const { postId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const question = await Blog.findByIdAndUpdate(postId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // increament the auhtor reputation by some point

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvotePost (params:blogVoteParams) {
  try {
    connectionToDatabase()

    const { postId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downvote: User } }
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const question = await Blog.findByIdAndUpdate(postId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // increament the auhtor reputation by some point

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteQuestions (params:DeleteBlogParams) {
  try {
    connectionToDatabase()

    const { postId, path } = params

    await Blog.deleteOne({ _id: postId })
    await Comments.deleteMany({ post: postId })
    await Interaction.deleteMany({ post: postId })
    await Tag.updateMany({ blogs: postId }, { $pull: { blogs: postId } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function editPosts (params:EditBlogParams) {
  try {
    connectionToDatabase()

    const { postId, path, title, content } = params

    const post = await Blog.findById(postId)

    if (!post) throw new Error('post not found')

    post.title = title
    post.content = content

    await post.save()

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
