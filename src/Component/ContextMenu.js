import React from "react";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuWrapper: {
    boxSizing: "border-box",
    paddingTop: 10,
    paddingBottom: 10,
    background: "white",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",

    flex: 1,
    background: "white",
  },
  itemsWrapper: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    background: "white",
  },

  text: {
    color: "#262626",
    textWrap: "wrap",
    wordBreak: "break-word",
  },

  startCompWrapper: {
    width: 20,
    height: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  endCompWrapper: {
    width: 20,
    height: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color:'#556A89',
    marginLeft: "auto",
  },

  icon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },
  item: {
    width: "100%",
  },
  iconContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  itemWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "320px",
    alignItems: "center",
  },
}));

const ContextMenu = ({
  menuId,
  items = [],
  onItemClick = () => {},
  menuWrapperStyles,
}) => {
  const classes = useStyles();

  return (
    <Menu
      data-id={menuId}
      id={menuId}
      style={menuWrapperStyles}
      className={classes.menuWrapper}
      onClick={(event) => (event.stopPropagation())}
      onScroll={(e) => e?.stopPropagation()}
      onWheel={(e) => e?.stopPropagation()}
      animation={false}
    >
      <div className={classes.contentWrapper}>
        <section className={classes.itemsWrapper}>
          {items.map((item) => {
            if (!item) {
              return null;
            }
            const {
              id,

              name,
              textStyles,
              email,
              picture,
            } = item;
            return (
              <Item
                className={classes.item}
                key={`menuItem_${id}`}
                closeOnClick={false}
                onClick={() => onItemClick(item)}
              >
                <div className={classes.itemWrapper}>
                  <div className={classes.iconContainer}>
                    <img src={picture} alt="no-icon" className={classes.icon} />
                    <div style={textStyles} className={`${classes.text}`}>
                      {name}
                    </div>
                  </div>

                  <div className={classes.endCompWrapper}>{email}</div>
                </div>
              </Item>
            );
          })}
        </section>
      </div>
    </Menu>
  );
};

export default ContextMenu;
