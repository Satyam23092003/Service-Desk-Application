// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios, { setAuthToken } from '../api';
// import { useAuth } from '../contexts/AuthContext';

// const statusColors = {
//   'Open': 'bg-blue-500',
//   'In Progress': 'bg-amber-500',
//   'Resolved': 'bg-green-500',
//   'Closed': 'bg-gray-400',
//   'Reopened': 'bg-red-500',
//   'Default': 'bg-gray-400',
// };

// const priorities = ['Low', 'Medium', 'High'];
// const categories = ['Software', 'Hardware', 'Network', 'Access', 'Other'];

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [tickets, setTickets] = useState([]);
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('Medium');
//   const [category, setCategory] = useState('Software');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     if (user?.token) {
//       setAuthToken(user.token);
//     } else {
//       setAuthToken(null);
//     }
//   }, []);

//   const fetchTickets = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const { data } = await axios.get('/tickets/mytickets');
//       setTickets(data);
//     } catch (err) {
//       console.error("Failed to load tickets:", err);
//       setError(err.response?.data?.message || 'Failed to load tickets. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.token) {
//       fetchTickets();
//     }
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setAuthToken(null);
//     navigate('/login');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!description.trim()) {
//       setError('Issue description is required.');
//       return;
//     }
//     setSubmitLoading(true);
//     try {
//       await axios.post('/tickets', { description, priority, category });
//       setDescription('');
//       setPriority('Medium');
//       setCategory('Software');
//       await fetchTickets();
//     } catch (err) {
//       console.error("Failed to create ticket:", err);
//       setError(err.response?.data?.message || 'Failed to create ticket. Please try again.');
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6 sm:p-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 mb-1">👋 Hello, {user?.name || 'Guest'}</h1>
//             <p className="text-gray-600">Manage your IT support tickets below</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors duration-200 whitespace-nowrap"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Main Content */}
//         {user?.role==='user' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Create Ticket Form */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Ticket</h2>
//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                     Issue Description *
//                   </label>
//                   <textarea
//                     id="description"
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
//                       Priority
//                     </label>
//                     <select
//                       id="priority"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={priority}
//                       onChange={(e) => setPriority(e.target.value)}
//                     >
//                       {priorities.map((p) => (
//                         <option key={p} value={p}>{p}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                       Category
//                     </label>
//                     <select
//                       id="category"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                     >
//                       {categories.map((c) => (
//                         <option key={c} value={c}>{c}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={submitLoading}
//                   className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
//                 >
//                   {submitLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     'Submit Ticket'
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* My Tickets List */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tickets</h2>
//             {loading ? (
//               <div className="flex items-center justify-center h-48">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                 <span className="ml-3">Loading tickets...</span>
//               </div>
//             ) : tickets.length === 0 ? (
//               <div className="bg-gray-50 rounded-lg p-6 h-48 flex items-center justify-center">
//                 <p className="text-gray-500">You haven't submitted any tickets yet.</p>
//               </div>
//             ) : (
//               <div className="bg-gray-50 rounded-lg overflow-hidden max-h-[500px] overflow-y-auto">
//                 <ul className="divide-y divide-gray-200">
//                   {tickets.map((ticket) => (
//                     <li key={ticket._id} className="hover:bg-gray-100 transition-colors duration-150">
//                       <button
//                         onClick={() => navigate(`/ticket/${ticket._id}`)}
//                         className="w-full text-left p-4"
//                       >
//                         <div className="flex justify-between items-center mb-2">
//                           <h3 className="font-semibold text-gray-800">
//                             {ticket.category} - {ticket.priority}
//                           </h3>
//                           <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${statusColors[ticket.status] || statusColors.Default}`}>
//                             {ticket.status}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600 line-clamp-2">
//                           {ticket.description}
//                         </p>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//         )}
       

//         {/* Admin Panel Button */}
//         {user?.role === 'admin' && (
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={() => navigate('/admin')}
//               className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
//             >
//               Go to Admin Panel
//             </button>
//           </div>
//         )}
 
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios, { setAuthToken } from '../api';
// import { useAuth } from '../contexts/AuthContext';

// const statusColors = {
//   'Open': 'bg-blue-500',
//   'In Progress': 'bg-amber-500',
//   'Resolved': 'bg-green-500',
//   'Closed': 'bg-gray-400',
//   'Reopened': 'bg-red-500',
//   'Default': 'bg-gray-400',
// };

// const priorities = ['Low', 'Medium', 'High'];
// const categories = ['Software', 'Hardware', 'Network', 'Access', 'Other'];

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [tickets, setTickets] = useState([]);
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('Medium');
//   const [category, setCategory] = useState('Software');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     if (user?.token) {
//       setAuthToken(user.token);
//     } else {
//       setAuthToken(null);
//     }
//   }, []);

//   const fetchTickets = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const { data } = await axios.get('/tickets/mytickets');
//       setTickets(data);
//     } catch (err) {
//       console.error("Failed to load tickets:", err);
//       setError(err.response?.data?.message || 'Failed to load tickets. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.token) {
//       fetchTickets();
//     }
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setAuthToken(null);
//     navigate('/login');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!description.trim()) {
//       setError('Issue description is required.');
//       return;
//     }
//     setSubmitLoading(true);
//     try {
//       await axios.post('/tickets', { description, priority, category });
//       setDescription('');
//       setPriority('Medium');
//       setCategory('Software');
//       await fetchTickets();
//     } catch (err) {
//       console.error("Failed to create ticket:", err);
//       setError(err.response?.data?.message || 'Failed to create ticket. Please try again.');
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 py-8 px-4 text-white ">
//       <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 sm:p-10">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-1">
//               👋 Hello, {user?.name || 'Guest'}
//             </h1>
//             <p className="text-white/80">Manage your IT support tickets below</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 border border-white/30 text-white rounded hover:bg-white/10 transition"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Main Content */}
//         {user?.role === 'user' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
//             {/* Create Ticket */}
//             <div>
//               <h2 className="text-2xl font-semibold mb-4 text-white">Create New Ticket</h2>
//               {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1">
//                     Issue Description *
//                   </label>
//                   <textarea
//                     id="description"
//                     rows={4}
//                     className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
//                     placeholder="Describe your issue here..."
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="priority" className="block text-sm font-medium text-white/80 mb-1">
//                       Priority
//                     </label>
//                     <select
//                       id="priority"
//                       className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                       value={priority}
//                       onChange={(e) => setPriority(e.target.value)}
//                     >
//                       {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-1">
//                       Category
//                     </label>
//                     <select
//                       id="category"
//                       className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                     >
//                       {categories.map((c) => <option key={c} value={c}>{c}</option>)}
//                     </select>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={submitLoading}
//                   className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
//                 >
//                   {submitLoading ? 'Submitting...' : 'Submit Ticket'}
//                 </button>
//               </form>
//             </div>

//             {/* My Tickets */}
//             <div>
//               <h2 className="text-2xl font-semibold mb-4 text-white">My Tickets</h2>
//               {loading ? (
//                 <div className="flex items-center justify-center h-48">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
//                   <span>Loading tickets...</span>
//                 </div>
//               ) : tickets.length === 0 ? (
//                 <div className="bg-white/10 rounded-lg p-6 text-white/80">
//                   You haven't submitted any tickets yet.
//                 </div>
//               ) : (
//                 <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
//                   {tickets.map(ticket => (
//                     <li key={ticket._id}>
//                       <button
//                         onClick={() => navigate(`/ticket/${ticket._id}`)}
//                         className="w-full text-left bg-white/10 p-4 rounded-lg hover:bg-white/20 transition"
//                       >
//                         <div className="flex justify-between items-center mb-1">
//                           <h3 className="font-semibold text-white">
//                             {ticket.category} - {ticket.priority}
//                           </h3>
//                           <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${statusColors[ticket.status] || statusColors.Default}`}>
//                             {ticket.status}
//                           </span>
//                         </div>
//                         <p className="text-sm text-white/70 line-clamp-2">
//                           {ticket.description}
//                         </p>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Admin Redirect Button */}
//         {user?.role === 'admin' && (
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={() => navigate('/admin')}
//               className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
//             >
//               Go to Admin Panel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { setAuthToken } from '../api';
import { useAuth } from '../contexts/AuthContext';

const statusColors = {
  'Open': 'bg-blue-500',
  'In Progress': 'bg-amber-500',
  'Resolved': 'bg-green-500',
  'Closed': 'bg-gray-400',
  'Reopened': 'bg-red-500',
  'Default': 'bg-gray-400',
};

const priorities = ['Low', 'Medium', 'High'];
const categories = ['Software', 'Hardware', 'Network', 'Access', 'Other'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Software');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
    } else {
      setAuthToken(null);
    }
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/tickets/mytickets');
      setTickets(data);
    } catch (err) {
      console.error("Failed to load tickets:", err);
      setError(err.response?.data?.message || 'Failed to load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchTickets();
    }
  }, []);

  const handleLogout = () => {
    logout();
    setAuthToken(null);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!description.trim()) {
      setError('Issue description is required.');
      return;
    }
    setSubmitLoading(true);
    try {
      await axios.post('/tickets', { description, priority, category });
      setDescription('');
      setPriority('Medium');
      setCategory('Software');
      await fetchTickets();
    } catch (err) {
      console.error("Failed to create ticket:", err);
      setError(err.response?.data?.message || 'Failed to create ticket. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 py-8 px-4 text-white">
      <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 sm:p-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              👋 Hello, {user?.name || 'Guest'}
            </h1>
            <p className="text-white/80">Manage your IT support tickets below</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white/30 text-white rounded hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        {user?.role === 'user' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Create Ticket */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Create New Ticket</h2>
              {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1">
                    Issue Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
                    placeholder="Describe your issue here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-white/80 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
                >
                  {submitLoading ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </form>
            </div>

            {/* My Tickets */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">My Tickets</h2>
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                  <span>Loading tickets...</span>
                </div>
              ) : tickets.length === 0 ? (
                <div className="bg-white/10 rounded-lg p-6 text-white/80">
                  You haven't submitted any tickets yet.
                </div>
              ) : (
                <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {tickets.map(ticket => (
                    <li key={ticket._id}>
                      <button
                        onClick={() => navigate(`/ticket/${ticket._id}`)}
                        className="w-full text-left bg-white/10 p-4 rounded-lg hover:bg-white/20 transition"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-semibold text-white">
                            {ticket.category} - {ticket.priority}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${statusColors[ticket.status] || statusColors.Default}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-sm text-white/70 line-clamp-2">
                          {ticket.description}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Admin Redirect Button */}
        {user?.role === 'admin' && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
            >
              Go to Admin Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


