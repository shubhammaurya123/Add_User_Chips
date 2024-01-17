import ContextMenu from "./ContextMenu";
import { useContextMenu } from "react-contexify";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { usersData } from "./userData";
const useStyles = makeStyles((theme) => ({
  contanier: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    gap: "60px",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#337EED",
    fontSize: "20px",
    fontWeight: "700",
  },
  userList: {
    width: "800px",
    display: "flex",
    borderBottom: "3px solid #337EED",
    padding: "4px",
    gap: "4px",
    flexWrap: "wrap",
  },
  input: {
    border: "none",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  chips: {
    display: "flex",
    gap: "20px",
    borderRadius: "30px",
    border: `1px solid gray`,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "6px",
    background: "#E4EAF2",
  },
  nametitle: {
    color: "black",
    fontSize: "16px",
    fontWeight: "500",
  },
  icon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  crossIcon: {
    cursor: "pointer",
  },
}));
function Portal({ children }) {
  return createPortal(children, document?.getElementsByTagName("body")[0]);
}

const AddChips = () => {
  const classes = useStyles();
  const [addedUsers, setAddedUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState(usersData);
  const [islastElementIsHighlighted, setIslastElementIsHighlighted] =
    useState(false);

  const { show, hideAll } = useContextMenu({ id: "chips_dropdown" });
  const [searchtext, setSearchText] = useState("");

  const conditionsTypeClickHandler = (e) => {
    show({
      event: e,
      props: {
        id: "chips_dropdown",
        position: { x: 0, y: 0 },
      },
    });
  };

  const handleActionPress = (item) => {
    setAddedUsers((prev) => [...prev, item]);
    const data = displayUsers.filter((user) => user?.id !== item.id);
    setDisplayUsers(data);
    setSearchText("");
    hideAll();
  };

  const contextMenuPropsforColumnValue = {
    menuId: "chips_dropdown",
    menuWrapperStyles: {
      zIndex: "1201",
      minWidth: "450px",
      maxHeight: "300px",
      overflowY: "auto",
    },
    items: displayUsers,
    onItemClick: (item) => handleActionPress(item),
  };
  const removeUserOnClick = (item) => {
    const dispalyUser = addedUsers.filter((user) => user?.id !== item?.id);
    setAddedUsers(dispalyUser);
    setDisplayUsers((prev) => [...prev, item]);
    setIslastElementIsHighlighted(false);
    setSearchText("");
  };
  const searchUsers = (searchText) => {
    const lowercaseSearchText = searchText.toLowerCase();
    const filteredUsers = displayUsers.filter((user) =>
      user.name.toLowerCase().includes(lowercaseSearchText)
    );
    setIslastElementIsHighlighted(false);
    return filteredUsers;
  };

  useEffect(() => {
    if (searchtext === "") {
      const elementsNotInArray2 = usersData.filter(
        (item1) => !addedUsers.some((item2) => item1.id === item2.id)
      );
      setDisplayUsers(elementsNotInArray2);
      return;
    }
    setDisplayUsers(searchUsers(searchtext));
  }, [searchtext]);
  const handleKeyDown = (event) => {
    if (!islastElementIsHighlighted) {
      setIslastElementIsHighlighted(true);
      return;
    }
    if (
      event.key === "Backspace" &&
      addedUsers.length > 0 &&
      searchtext === ""
    ) {
      const newArray = [...addedUsers];
      newArray.pop();
      setAddedUsers(newArray);
      hideAll()
    }
  };
  return (
    <div className={classes.contanier}>
      <div className={classes.title}> Pick Users</div>
      <div className={classes.userList}>
        {addedUsers.map((item, index) => (
          <div
            key={index}
            className={classes?.chips}
            style={
              addedUsers.length === index + 1 && islastElementIsHighlighted
                ? { border: `2px solid #337EED` }
                : {}
            }
          >
            <img src={item?.picture} alt="no-pic" className={classes.icon} />
            <span className={classes.nametitle}>{item?.name}</span>
            <ClearIcon
              className={classes.crossIcon}
              onClick={() => removeUserOnClick(item)}
            />
          </div>
        ))}
        <input
          onClick={conditionsTypeClickHandler}
          className={classes.input}
          type="text"
          value={searchtext}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add New User ....`}
          id="chips_dropdown"
        />
      </div>
      <Portal>
        <ContextMenu {...contextMenuPropsforColumnValue} />
      </Portal>
    </div>
  );
};

export default AddChips;
