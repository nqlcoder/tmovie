import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdpApi";

const VideoList = (props) => {
    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 5));
        };
        getVideos();
    }, [category, props.id]);
    return (
        <>
            {videos.map((item, i) => (
                <Video key={i} item={item} />
            ))}
        </>
    );
};

const Video = (props) => {
    const item = props.item;

    const iframe = useRef(null);

    useEffect(() => {
        const height = (iframe.current.offsetWidth * 9) / 16 + "px";
        iframe.current.setAttribute("height", height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframe}
                width="100%"
                title="video"
            ></iframe>
        </div>
    );
};

export default VideoList;
