import React, { memo, useCallback } from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import classNames from "classnames";
import "./PlayList.scss";
import SortableList from "wardell-sortable-list";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCurrentIndex,
  updatePlayList,
} from "../../store/musicPlayerReducer";

const PlayList = () => {
  return (
    <div className={classNames("play-list")}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: "pointer" }}
        />
      </div>
      {/* <SortableList
        data={playList}
        onDropItem={onDropItem}
        onClickItem={onClickItem}
        renderItem={renderItem}
      /> */}
    </div>
  );
};

export default memo(PlayList);
