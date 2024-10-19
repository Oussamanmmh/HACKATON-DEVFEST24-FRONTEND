"use client"
import axios from "axios";
import Header from "./components/header";
import Notify from "./components/notify";
import { useState, useEffect } from "react";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 5;

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const userId = JSON.parse(localStorage.getItem('user')).userId;
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/notifications/notifications/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Sort notifications by updatedAt in descending order
                const sortedNotifications = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                setNotifications(sortedNotifications);

                console.log(sortedNotifications);
            } catch (err) {
                console.log(err);
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);
    useEffect(() => {
        console.log(selectedNotifications);
    }, [selectedNotifications]);

    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const totalPages = Math.ceil(notifications.length / notificationsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <section>
                <Header selectedNotifications={selectedNotifications} setSelectedNotifications={setSelectedNotifications} notifications={notifications} setNotifications={setNotifications}/>
                <div className="rounded-xl overflow-x-clip">
                    {
                        currentNotifications.map((notification, index) => (
                            <Notify key={index} selectedNotifications={selectedNotifications} setSelectedNotifications={setSelectedNotifications} title={notification.title} machineId={notification.machineId} updatedAt={notification.updatedAt} message={notification.message} isRead={notification.isRead} id={notification._id} />
                        ))
                    }
                </div>
                
                <div className="flex justify-between items-center text-gray-500 mt-10">
                    {/* Pagination Info */}
                    <p>
                        Showing {indexOfFirstNotification + 1} - {indexOfLastNotification > notifications.length ? notifications.length : indexOfLastNotification} of {notifications.length}
                    </p>
                    <div className="flex items-center">
                        {/* Previous Button */}
                        <button 
                            onClick={prevPage} 
                            className="border-[1px] border-gray-300 p-2 rounded-tl-xl rounded-bl-xl"
                            disabled={currentPage === 1} // Disable on first page
                        >
                            <svg width="12" height="14" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.41 10.4064L2.83 6.00002L7.41 1.59362L6 0.240021L0 6.00002L6 11.76L7.41 10.4064Z" fill="#202224"/>
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button 
                            onClick={nextPage} 
                            className="border-[1px] border-gray-300 p-2 rounded-br-xl rounded-tr-xl"
                            disabled={currentPage === totalPages} // Disable on last page
                        >
                            <svg width="12" height="14" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                                <path d="M7.41 10.4064L2.83 6.00002L7.41 1.59362L6 0.240021L0 6.00002L6 11.76L7.41 10.4064Z" fill="#202224"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
