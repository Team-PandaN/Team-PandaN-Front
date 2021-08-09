import React, { useEffect } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { ProjectInvite } from "..";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../modules/configStore";

import { ReactComponent as IconProfile } from "../../styles/images/ico-profile.svg";
import { ReactComponent as IconMemberAdd } from "../../styles/images/ico-member-add.svg";
const MemberToggle = props => {
  const dispatch = useDispatch();
  const projectId = props.projectId;
  const projectCrews = useSelector(state => state.project.projectCrews);
  console.log(projectCrews);
  const countCrews = projectCrews.length;
  console.log(countCrews);
  useEffect(() => {
    dispatch(projectActions.__checkProjectCrews(projectId));
  }, []);
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" align="end">
          멤버{countCrews}명
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-group"
          style={{
            width: "220px",
            minHeight: "450px",
          }}
        >
          <Dropdown.ItemText
            className="text-center"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <IconProfile
              width="40"
              height="40"
              fill="#ffffff"
              className="dropdown-profile"
            />
            <div style={{ marginLeft: "10px", textAlign: "left" }}>
              <p className="dropdown-name">User Name</p>
              <p
                className="dropdown-email"
                style={{
                  width: "120px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                UserId_123456789@gmail.com
              </p>
            </div>
          </Dropdown.ItemText>
          <Dropdown.Divider style={{ height: "0" }} />
          <Dropdown.ItemText>
            {/* == 로그아웃 */}
            멤버({countCrews})
          </Dropdown.ItemText>
          <Dropdown.ItemText>
            {countCrews > 1 ? (
              projectCrews.map((c, idx) => {
                return <div key={idx}>{c.userName}</div>;
              })
            ) : (
              <div>
                <div style={{ marginLeft: "42px" }}>
                  <IconMemberAdd
                    width="100"
                    height="100"
                    fill="#9A9A9A"
                    className="menu-icon"
                  />
                </div>
                <div>
                  <p>멤버가 없습니다. </p>
                  <p>멤버를 초대하여 함께 협업공간을</p>
                  <p>진행해보세요!</p>
                </div>
              </div>
            )}
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MemberToggle;