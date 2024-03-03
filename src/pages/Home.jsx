import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import LoginImg from "../assets/login.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-2 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <img className="h-80 w-full" src={LoginImg} alt="Login" />
              <h1 className="text-2xl font-bold text-gray-800 mt-4">
                Please login to see posts
              </h1>
              <button className="px-5 py-2 mt-2 rounded-full text-white font-semibold hover:bg-green-600 bg-green-500" onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
