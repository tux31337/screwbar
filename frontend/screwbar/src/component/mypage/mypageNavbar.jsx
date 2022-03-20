import '../../css/mypage/mypageNavbar.css';
import SidebarItem from './sidebarItem';
import { Link, useLocation } from 'react-router-dom';

function MypageNavbar() {
  const pathName = useLocation().pathname;
  const menus = [
    { name: '내 팀 현황', path: '/myTeam' },
    { name: '프로필 수정', path: '/modifyPw' },
    { name: '채팅 목록', path: '/chatting' },
  ];

  return (
    <nav className="myPageNav">
      <div className="myProfileNav">
        {menus.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <SidebarItem
                menu={menu}
                isActive={pathName === menu.path ? true : false}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MypageNavbar;
