'use client'

import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Star, Search, Calendar } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

// Mock data for the pie chart
const spendingData = {
  labels: ['Food', 'Drinks', 'Snacks', 'Others'],
  datasets: [
    {
      data: [30, 25, 25, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
}

const feedbackData = {
  success: true,
  message: "Fetched successfully",
  feedbacks: [
    {
      feedback_id: 1,
      user_id: 1,
      store_id: 3,
      rating: 2,
      comments: null,
      created_at: "2024-10-10T18:13:30.000Z",
      business_id: 0,
      user: {
        first_name: "Himanshu",
        last_name: "Raj Singh"
      }
    },
    {
      feedback_id: 2,
      user_id: 1,
      store_id: 3,
      rating: 2,
      comments: "Good store",
      created_at: "2024-10-10T18:14:57.000Z",
      business_id: 0,
      user: {
        first_name: "Himanshu",
        last_name: "Raj Singh"
      }
    }
  ]
}

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

const CustomerFeedback = () => {
  const [ratingFilter, setRatingFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  // Filtering logic
  const filteredFeedbacks = feedbackData.feedbacks.filter((feedback) => {
    const matchesRating =
      !ratingFilter || feedback.rating.toString().includes(ratingFilter)
    const matchesDate =
      !dateFilter ||
      new Date(feedback.created_at).toLocaleDateString().includes(dateFilter)

    return matchesRating && matchesDate
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2">📋</span> Customer Feedback & Reviews
        </h1>
        <p className="text-gray-600 mb-6">View and filter customer reviews</p>

        <div className="flex mb-6 space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter by rating"
              className="w-full p-2 pl-10 border rounded-md"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter by date"
              className="w-full p-2 pl-10 border rounded-md"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback.feedback_id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">{`${feedback.user.first_name} ${feedback.user.last_name}`}</h2>
                  <StarRating rating={feedback.rating} />
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(feedback.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{feedback.comments || 'No comments provided'}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Customer Spending Distribution</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {/* <Pie data={spendingData} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerFeedback
