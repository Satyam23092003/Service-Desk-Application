// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Typography, Button, Box, TextField, Chip, Divider,
//   List, ListItem, ListItemText
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../api';
// import { useAuth } from '../contexts/AuthContext';

// export default function TicketDetail() {
//   const { user } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [ticket, setTicket] = useState(null);
//   const [error, setError] = useState('');
//   const [updateText, setUpdateText] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     async function fetchTicket() {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`/tickets/${id}`);
//         setTicket(data);
//         setLoading(false);
//         setTimeout(() => {
//           if(scrollRef.current) {
//             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//           }
//         }, 300);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load ticket');
//         setLoading(false);
//       }
//     }
//     fetchTicket();
//   }, [id]);

//   const handleAddUpdate = async () => {
//     if(!updateText.trim()) return;
//     try {
//       setUpdateLoading(true);
//       const { data } = await axios.post(`/tickets/${id}/updates`, { text: updateText });
//       setTicket(data);
//       setUpdateText('');
//       setUpdateLoading(false);
//       setTimeout(() => {
//         if(scrollRef.current) {
//           scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//         }
//       }, 300);
//     } catch {
//       setError('Failed to add update');
//       setUpdateLoading(false);
//     }
//   };

//   if(loading) return <Typography>Loading ticket details...</Typography>;
//   if(error) return (
//     <Box>
//       <Typography color="error">{error}</Typography>
//       <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>Go Back</Button>
//     </Box>
//   );
//   if(!ticket) return null;

//   return (
//     <Box>
//       <Button sx={{ mb: 2 }} onClick={() => navigate(-1)}>Back</Button>
//       <Typography variant="h5" mb={1}>Ticket Details</Typography>

//       <Typography variant="subtitle1">
//         <strong>Category:</strong> {ticket.category}
//       </Typography>
//       <Typography variant="subtitle1">
//         <strong>Priority:</strong> {ticket.priority}
//       </Typography>
//       <Typography variant="subtitle1">
//         <strong>Status:</strong>{' '}
//         <Chip label={ticket.status} 
//           color={
//             ticket.status === 'Open' ? 'primary' :
//             ticket.status === 'In Progress' ? 'info' :
//             ticket.status === 'Resolved' ? 'success' :
//             'default'
//           }
//           size="small"
//         />
//       </Typography>
//       <Typography variant="subtitle1" mb={2}>
//         <strong>Assigned To:</strong> {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}
//       </Typography>

//       <Typography variant="body1" mb={3}>
//         <strong>Description:</strong><br />{ticket.description}
//       </Typography>

//       <Typography variant="h6">Updates</Typography>
//       <Box 
//         ref={scrollRef} 
//         sx={{
//           maxHeight: 300, overflowY: 'auto', mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2
//         }}
//       >
//         {ticket.updates.length === 0 && <Typography>No updates yet.</Typography>}
//         <List>
//           {ticket.updates.map(update => (
//             <ListItem key={update._id || update.date}>
//               <ListItemText 
//                 primary={update.text} 
//                 secondary={`${update.user?.name || 'Unknown'} on ${new Date(update.date).toLocaleString()}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       <TextField
//         multiline
//         rows={3}
//         fullWidth
//         placeholder="Write your update here..."
//         value={updateText}
//         onChange={e => setUpdateText(e.target.value)}
//         disabled={updateLoading}
//       />
//       <Button 
//         variant="contained" 
//         onClick={handleAddUpdate} 
//         sx={{ mt: 1 }}
//         disabled={updateLoading || updateText.trim() === ''}
//       >
//         Add Update
//       </Button>
//     </Box>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function TicketDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        setLoading(true);
        const { data } = await axios.get(`/tickets/${id}`);
        setTicket(data);
        setLoading(false);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 300);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load ticket');
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  const handleAddUpdate = async () => {
    if (!updateText.trim()) return;
    try {
      setUpdateLoading(true);
      const { data } = await axios.post(`/tickets/${id}/updates`, { text: updateText });
      setTicket(data);
      setUpdateText('');
      setUpdateLoading(false);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 300);
    } catch {
      setError('Failed to add update');
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center">Loading ticket details...</div>;
  if (error) return (
    <div className="text-center text-red-400">
      <p>{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Go Back
      </button>
    </div>
  );
  if (!ticket) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Your Ticket Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20 rounded"
          >
            Back
          </button>
        </div>

        <div className="space-y-4 border border-white/30 rounded-xl p-5 bg-white/5 shadow-md">
          <div>
            <p><span className="font-semibold">Category:</span> {ticket.category}</p>
            <p><span className="font-semibold">Priority:</span> {ticket.priority}</p>
            <p>
              <span className="font-semibold">Status:</span>{' '}
              <span className={`inline-block px-2 py-1 text-sm rounded-full font-semibold text-white ${
                ticket.status === 'Open' ? 'bg-blue-500' :
                ticket.status === 'In Progress' ? 'bg-amber-500' :
                ticket.status === 'Resolved' ? 'bg-green-500' :
                'bg-gray-500'
              }`}>
                {ticket.status}
              </span>
            </p>
            <p><span className="font-semibold">Assigned To:</span> {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}</p>
          </div>

          <div className="text-white">
            <h2 className="font-semibold mb-1">Description:</h2>
            <p className="bg-white/10 rounded p-4 text-sm leading-relaxed">{ticket.description}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold mb-3">Updates</h3>
          <div
            ref={scrollRef}
            className="max-h-72 overflow-y-auto mb-4 p-4 border border-white/30 rounded-lg bg-white/5"
          >
            {ticket.updates.length === 0 && <p className="text-gray-300">No updates yet.</p>}
            <ul className="space-y-4">
              {ticket.updates.map(update => (
                <li key={update._id || update.date} className="border-b border-gray-600 pb-2">
                  <p className="text-sm">{update.text}</p>
                  <p className="text-xs text-gray-300">
                    — {update.user?.name || 'Unknown'} on {new Date(update.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <textarea
            rows={3}
            className="w-full p-3 rounded bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Write your update here..."
            value={updateText}
            onChange={e => setUpdateText(e.target.value)}
            disabled={updateLoading}
          ></textarea>

          <button
            onClick={handleAddUpdate}
            className="mt-3 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md disabled:opacity-50"
            disabled={updateLoading || updateText.trim() === ''}
          >
            Add Update
          </button>
        </div>
      </div>
    </div>
  );
}
