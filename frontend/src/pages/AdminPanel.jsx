// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Typography, Box, List, Select, MenuItem, Alert
// } from '@mui/material';
// import axios from '../api';

// export default function AdminPanel() {
//   const [tickets, setTickets] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchWithAuth = async (url) => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       return response.data;
//     } catch (err) {
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//       throw err;
//     }
//   };

//   const fetchTickets = async () => {
//     try {
//       const data = await fetchWithAuth('/tickets');
//       setTickets(data);
//     } catch {
//       setError('Failed to load tickets. Please login again.');
//     }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const data = await fetchWithAuth('/users');
//       const adminsOnly = data.filter(u => u.role === 'admin');
//       setAdmins(adminsOnly);
//     } catch {
//       setError('Failed to load admins. Please login again.');
//     }
//   };

//   const handleAssign = async (ticketId, adminId) => {
//     try {
//       await axios.put(`/tickets/${ticketId}/assign`, { adminId }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       fetchTickets();
//     } catch (err) {
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       } else {
//         setError('Failed to assign ticket.');
//       }
//     }
//   };

//   useEffect(() => {
//     if (!localStorage.getItem('token')) {
//       navigate('/login');
//       return;
//     }
//     fetchTickets();
//     fetchAdmins();
//   }, [navigate]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" mb={3}>Admin Panel - Manage Tickets</Typography>
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {tickets.length === 0 ? (
//         <Typography>No tickets found.</Typography>
//       ) : (
//         <List>
//           {tickets.map(ticket => (
//             <Box key={ticket._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
//               <Typography variant="h6" mb={1}>{ticket.category} - {ticket.priority}</Typography>
//               <Typography mb={1}>{ticket.description}</Typography>

//               <Typography mb={1}>
//                 <strong>Status: </strong>
//                 <Select
//                   value={ticket.status}
//                   onChange={e => handleStatusChange(ticket._id, e.target.value)}
//                   size="small"
//                   sx={{ minWidth: 130, ml: 1 }}
//                 >
//                   <MenuItem value="Open">Open</MenuItem>
//                   <MenuItem value="In Progress">In Progress</MenuItem>
//                   <MenuItem value="Resolved">Resolved</MenuItem>
//                   <MenuItem value="Closed">Closed</MenuItem>
//                 </Select>
//               </Typography>

//               <Typography mb={1}>
//                 <strong>Assigned To: </strong>
//                 <Select
//                   value={ticket.assignedTo?._id || ''}
//                   onChange={e => handleAssign(ticket._id, e.target.value)}
//                   displayEmpty
//                   size="small"
//                   sx={{ minWidth: 180, ml: 1 }}
//                 >
//                   <MenuItem value="">Unassigned</MenuItem>
//                   {admins.map(admin => (
//                     <MenuItem key={admin._id} value={admin._id}>
//                       {admin.name} ({admin.email})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </Typography>

//               <Typography>
//                 <strong>Created By: </strong> {ticket?.user?.name} ({ticket?.user?.email})
//               </Typography>
//             </Box>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// }




// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Typography, Box, List, Select, MenuItem, Alert
// } from '@mui/material';
// import axios from '../api';

// export default function AdminPanel() {
//   const [tickets, setTickets] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const hasNavigated = useRef(false); // useRef avoids re-renders

//   const logoutAndRedirect = () => {
//     if (!hasNavigated.current) {
//       hasNavigated.current = true;
//       localStorage.removeItem('token');
//       setTimeout(() => navigate('/login'), 0); // defer navigation
//     }
//   };

//   const fetchWithAuth = async (url) => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       return response.data;
//     } catch (err) {
//       if (err.response?.status === 401) {
//         logoutAndRedirect();
//       }
//       throw err;
//     }
//   };

//   const fetchTickets = async () => {
//     try {
//       const data = await fetchWithAuth('/tickets');
//       setTickets(data);
//     } catch {
//       setError('Failed to load tickets. Please login again.');
//     }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const data = await fetchWithAuth('/users');
//       const adminsOnly = data.filter(u => u.role === 'admin');
//       setAdmins(adminsOnly);
//     } catch {
//       setError('Failed to load admins. Please login again.');
//     }
//   };

//   const handleAssign = async (ticketId, adminId) => {
//     try {
//       await axios.put(`/tickets/${ticketId}/assign`, { adminId }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       fetchTickets();
//     } catch (err) {
//       if (err.response?.status === 401) {
//         logoutAndRedirect();
//       } else {
//         setError('Failed to assign ticket.');
//       }
//     }
//   };

//   const handleStatusChange = async (ticketId, status) => {
//     try {
//       await axios.put(`/tickets/${ticketId}/status`, { status }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       fetchTickets();
//     } catch {
//       setError('Failed to update ticket status.');
//     }
//   };

//   useEffect(() => {
//     if (!localStorage.getItem('token')) {
//       logoutAndRedirect();
//       return;
//     }
//     fetchTickets();
//     fetchAdmins();
//   }, []);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" mb={3}>Admin Panel - Manage Tickets</Typography>
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {tickets.length === 0 ? (
//         <Typography>No tickets found.</Typography>
//       ) : (
//         <List>
//           {tickets.map(ticket => (
//             <Box key={ticket._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
//               <Typography variant="h6" mb={1}>{ticket.category} - {ticket.priority}</Typography>
//               <Typography mb={1}>{ticket.description}</Typography>

//               <Typography mb={1}>
//                 <strong>Status: </strong>
//                 <Select
//                   value={ticket.status}
//                   onChange={e => handleStatusChange(ticket._id, e.target.value)}
//                   size="small"
//                   sx={{ minWidth: 130, ml: 1 }}
//                 >
//                   <MenuItem value="Open">Open</MenuItem>
//                   <MenuItem value="In Progress">In Progress</MenuItem>
//                   <MenuItem value="Resolved">Resolved</MenuItem>
//                   <MenuItem value="Closed">Closed</MenuItem>
//                 </Select>
//               </Typography>

//               <Typography mb={1}>
//                 <strong>Assigned To: </strong>
//                 <Select
//                   value={ticket.assignedTo?._id || ''}
//                   onChange={e => handleAssign(ticket._id, e.target.value)}
//                   displayEmpty
//                   size="small"
//                   sx={{ minWidth: 180, ml: 1 }}
//                 >
//                   <MenuItem value="">Unassigned</MenuItem>
//                   {admins.map(admin => (
//                     <MenuItem key={admin._id} value={admin._id}>
//                       {admin.name} ({admin.email})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </Typography>

//               <Typography>
//                 <strong>Created By: </strong> {ticket?.user?.name} ({ticket?.user?.email})
//               </Typography>
//             </Box>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

export default function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  const logoutAndRedirect = () => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchWithAuth = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) logoutAndRedirect();
      throw err;
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await fetchWithAuth('/tickets');
      setTickets(data);
    } catch {
      setError('❌ Failed to load tickets. Please login again.');
    }
  };

  const fetchAdmins = async () => {
    try {
      const data = await fetchWithAuth('/users');
      setAdmins(data.filter(user => user.role === 'admin'));
    } catch {
      setError('❌ Failed to load admins.');
    }
  };

  const handleAssign = async (ticketId, adminId) => {
    try {
      await axios.put(`/tickets/${ticketId}/assign`, { adminId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTickets();
    } catch {
      setError('⚠️ Failed to assign ticket.');
    }
  };

  const handleStatusChange = async (ticketId, status) => {
    try {
      await axios.put(`/tickets/${ticketId}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTickets();
    } catch {
      setError('⚠️ Failed to update ticket status.');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      logoutAndRedirect();
    } else {
      fetchTickets();
      fetchAdmins();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#7c3aed] to-[#ec4899] py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 drop-shadow-md">
            Admin Panel - Manage Tickets
          </h1>
          <p className="mt-2 text-lg text-white/80">Monitor, assign, and resolve support issues in style ✨</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded shadow text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {tickets.length === 0 ? (
            <div className="text-white text-center text-lg">🎉 All clear! No open tickets.</div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg transition transform hover:scale-[1.01]">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold text-white mb-1">
                    {ticket.category} <span className="text-white/60">—</span> {ticket.priority}
                  </h2>
                  <p className="text-white/90">{ticket.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-1 block">Status</label>
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                      className="w-full bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-lg border border-white/30 shadow-inner focus:ring-2 focus:ring-white/70 focus:outline-none"
                    >
                      {['Open', 'In Progress', 'Resolved', 'Closed'].map(status => (
                        <option key={status} value={status} className="text-black">
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-1 block">Assign to Admin</label>
                    <select
                      value={ticket.assignedTo?._id || ''}
                      onChange={(e) => handleAssign(ticket._id, e.target.value)}
                      className="w-full bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-lg border border-white/30 shadow-inner focus:ring-2 focus:ring-white/70 focus:outline-none"
                    >
                      <option value="" className="text-black">Unassigned</option>
                      {admins.map(admin => (
                        <option key={admin._id} value={admin._id} className="text-black">
                          {admin.name} ({admin.email})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 text-white/80 text-sm">
                  <span className="font-medium">Created By:</span> {ticket?.user?.name} ({ticket?.user?.email})
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
