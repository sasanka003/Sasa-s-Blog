import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUser from "../components/DashUser";
import DashComment from "../components/DashComment";
import DashHome from "../components/DashHome";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar/>
      </div>
      {/* dashboard... */}
      {(tab === 'dashhome' || tab === '') && <DashHome/>}
      {/* profile... */}
      {tab === 'profile' && <DashProfile/>}
      {/* users... */}
      {tab === 'users' && <DashUser/>}
      {/* posts... */}
      {tab === 'posts' && <DashPost/>}
      {/* comments... */}
      {tab === 'comments' && <DashComment/>}
    </div>
  )
}
