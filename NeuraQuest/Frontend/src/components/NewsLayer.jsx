import { ArrowRight, TrendingUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { FileText, Bookmark } from 'react-feather';

const NewsLayer = () => {
    const [recentCases, setRecentCases] = useState([]);

    useEffect(() => {
        const fetchRecentCases = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/get_trending_cases/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                const cases = data.data.map(item => ({
                    title: item.title,
                    url: item.url,
                    description: item.description,
                }));
                setRecentCases(cases);
            } catch (error) {
                console.error('Error fetching recent cases:', error);
            }
        };

        fetchRecentCases();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="mt-5">
                <h2 className="font-medium text-lg flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-law-primary mr-2" />
                    Trending News Cases
                </h2>
                <div className="space-y-4 overflow-y-scroll max-h-[500px] pr-2">
                    {recentCases.map((kase, index) => (
                        <div key={index} className="">

                            <div className="flex justify-between items-start mb-1 flex-col border-b border-law-border pb-2">
                                <h2 className="font-medium text-sm overflow-hidden text-ellipsis" title={kase.title}>{kase.title}</h2>
                                <p className="text-sm text-gray-500">{kase.description}</p>
                                <button onClick={() => window.open(kase.url, '_blank')}  className="mt-2 flex text-primary items-center align-middle justify-center hover:text-law-primary overflow-hidden truncate">
                                    Read More
                                    <ArrowRight className="h-4 w-4 ml-1 mt-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsLayer;