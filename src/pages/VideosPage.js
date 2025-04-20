import React from 'react';

function VideosPage() {
    return (
        <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-extrabold text-red-600 mb-4">🎥 Videos</h1>
            <p className="text-lg text-gray-700">This is where videos or highlights can be embedded. Great for film study or inspiration!</p>
            <button onClick={() => window.location.href='/'} className="mt-8 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">
                Back Home
            </button>
        </div>
    );
}

export default VideosPage;
