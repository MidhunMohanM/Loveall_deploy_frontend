import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Download, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../utils/tokenManager';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalAmount: '0',
    completedTransactions: 0,
    pendingTransactions: 0,
    averageAmount: '0'
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const demoMetrics = {
    totalAmount: '50000',
    completedTransactions: 35,
    pendingTransactions: 10,
    averageAmount: '1250'
  };

  const demoTransactions = [
    {
      transaction_id: 'T12345',
      date: '2024-11-19',
      customer_product: 'Product A',
      amount: '1500',
      discounted_amount: '200',
      after_discount_price: '1300',
      status: 'completed'
    },
    {
      transaction_id: 'T12346',
      date: '2024-11-18',
      customer_product: 'Product B',
      amount: '2000',
      discounted_amount: null,
      after_discount_price: '2000',
      status: 'pending'
    },
    {
      transaction_id: 'T12347',
      date: '2024-11-17',
      customer_product: 'Expenses',
      amount: '500',
      discounted_amount: null,
      after_discount_price: '500',
      status: 'failed'
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/business/login");
    } else {
      fetchTransactions();
    }
  }, [isAuthenticated, navigate, filter]);

  const fetchTransactions = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // const response = await fetch(`${process.env.REACT_APP_API_URL}/Buss/transactions?filter=${filter}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch transactions');
      // }

      // const data = await response.json();


      // setTransactions(data.transactions);
      // setMetrics(data.metrics);
      setTransactions(demoTransactions);
      setMetrics(demoMetrics); 
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/Buss/export-csv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to export CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownloadInvoices = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/Buss/download-invoices`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download invoices');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'invoices.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <ArrowUpRight className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Transaction Amount', value: `Rs. ${parseFloat(metrics.totalAmount).toLocaleString('en-IN')}` },
          { title: 'Completed Transactions', value: metrics.completedTransactions },
          { title: 'Pending Transactions', value: metrics.pendingTransactions },
          { title: 'Average Transaction Value', value: `Rs. ${parseFloat(metrics.averageAmount).toLocaleString('en-IN')}` }
        ].map((metric, index) => (
          <div
            key={index}
            className="p-4 rounded-lg text-white"
            style={{
              background: 'rgb(71,0,28)',
              background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
            }}
          >
            <h3 className="text-sm opacity-90 mb-2">{metric.title}</h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button 
              className={`pb-1 ${filter === 'all' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`pb-1 ${filter === 'discounted' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setFilter('discounted')}
            >
              Discounted
            </button>
            <button 
              className={`pb-1 ${filter === 'full-price' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setFilter('full-price')}
            >
              Full-Price
            </button>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-gray-600" onClick={handleExportCSV}>
              <FileSpreadsheet className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 text-gray-600" onClick={handleDownloadInvoices}>
              <Download className="w-4 h-4" />
              Download Invoices
            </button>
            <select className="border rounded px-2 py-1 text-gray-600">
              <option>Status: All</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-4">Transaction ID</th>
                <th className="pb-4">Transaction Date</th>
                <th className="pb-4">Product</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Discounted Amount</th>
                <th className="pb-4">After Discount Price</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => (
                <tr key={transaction.transaction_id} className="text-sm">
                  <td className="py-4">{transaction.transaction_id}</td>
                  <td className="py-4">{transaction.date}</td>
                  <td className="py-4">{transaction.customer_product}</td>
                  <td className="py-4">
                    {transaction.customer_product === 'Expenses' ? '-' : '+'}
                    ₹{parseFloat(transaction.amount).toFixed(2)}
                  </td>
                  <td className="py-4">
                    {transaction.discounted_amount ? `₹${parseFloat(transaction.discounted_amount).toFixed(2)}` : '-'}
                  </td>
                  <td className="py-4">
                    {transaction.customer_product === 'Expenses' ? '-' : '+'}
                    ₹{parseFloat(transaction.after_discount_price).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;