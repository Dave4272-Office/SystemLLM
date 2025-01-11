import React from "react";

import clsx from "clsx";
import { Surface, Symbols } from "recharts";
import { Payload, Props } from "recharts/types/component/DefaultLegendContent";

const SIZE = 32;

type RecordString<T> = Record<string, T>;

const EventKeys = [
  "dangerouslySetInnerHTML",
  "onCopy",
  "onCopyCapture",
  "onCut",
  "onCutCapture",
  "onPaste",
  "onPasteCapture",
  "onCompositionEnd",
  "onCompositionEndCapture",
  "onCompositionStart",
  "onCompositionStartCapture",
  "onCompositionUpdate",
  "onCompositionUpdateCapture",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onChange",
  "onChangeCapture",
  "onBeforeInput",
  "onBeforeInputCapture",
  "onInput",
  "onInputCapture",
  "onReset",
  "onResetCapture",
  "onSubmit",
  "onSubmitCapture",
  "onInvalid",
  "onInvalidCapture",
  "onLoad",
  "onLoadCapture",
  "onError",
  "onErrorCapture",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyPressCapture",
  "onKeyUp",
  "onKeyUpCapture",
  "onAbort",
  "onAbortCapture",
  "onCanPlay",
  "onCanPlayCapture",
  "onCanPlayThrough",
  "onCanPlayThroughCapture",
  "onDurationChange",
  "onDurationChangeCapture",
  "onEmptied",
  "onEmptiedCapture",
  "onEncrypted",
  "onEncryptedCapture",
  "onEnded",
  "onEndedCapture",
  "onLoadedData",
  "onLoadedDataCapture",
  "onLoadedMetadata",
  "onLoadedMetadataCapture",
  "onLoadStart",
  "onLoadStartCapture",
  "onPause",
  "onPauseCapture",
  "onPlay",
  "onPlayCapture",
  "onPlaying",
  "onPlayingCapture",
  "onProgress",
  "onProgressCapture",
  "onRateChange",
  "onRateChangeCapture",
  "onSeeked",
  "onSeekedCapture",
  "onSeeking",
  "onSeekingCapture",
  "onStalled",
  "onStalledCapture",
  "onSuspend",
  "onSuspendCapture",
  "onTimeUpdate",
  "onTimeUpdateCapture",
  "onVolumeChange",
  "onVolumeChangeCapture",
  "onWaiting",
  "onWaitingCapture",
  "onAuxClick",
  "onAuxClickCapture",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onContextMenuCapture",
  "onDoubleClick",
  "onDoubleClickCapture",
  "onDrag",
  "onDragCapture",
  "onDragEnd",
  "onDragEndCapture",
  "onDragEnter",
  "onDragEnterCapture",
  "onDragExit",
  "onDragExitCapture",
  "onDragLeave",
  "onDragLeaveCapture",
  "onDragOver",
  "onDragOverCapture",
  "onDragStart",
  "onDragStartCapture",
  "onDrop",
  "onDropCapture",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseMoveCapture",
  "onMouseOut",
  "onMouseOutCapture",
  "onMouseOver",
  "onMouseOverCapture",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onSelectCapture",
  "onTouchCancel",
  "onTouchCancelCapture",
  "onTouchEnd",
  "onTouchEndCapture",
  "onTouchMove",
  "onTouchMoveCapture",
  "onTouchStart",
  "onTouchStartCapture",
  "onPointerDown",
  "onPointerDownCapture",
  "onPointerMove",
  "onPointerMoveCapture",
  "onPointerUp",
  "onPointerUpCapture",
  "onPointerCancel",
  "onPointerCancelCapture",
  "onPointerEnter",
  "onPointerEnterCapture",
  "onPointerLeave",
  "onPointerLeaveCapture",
  "onPointerOver",
  "onPointerOverCapture",
  "onPointerOut",
  "onPointerOutCapture",
  "onGotPointerCapture",
  "onGotPointerCaptureCapture",
  "onLostPointerCapture",
  "onLostPointerCaptureCapture",
  "onScroll",
  "onScrollCapture",
  "onWheel",
  "onWheelCapture",
  "onAnimationStart",
  "onAnimationStartCapture",
  "onAnimationEnd",
  "onAnimationEndCapture",
  "onAnimationIteration",
  "onAnimationIterationCapture",
  "onTransitionEnd",
  "onTransitionEndCapture",
];

const adaptEventsOfChild = (
  props: RecordString<unknown>,
  data: Payload,
  index: number
): RecordString<(e?: Event) => void> | null => {
  if (
    props === null ||
    (typeof props !== "object" && typeof props !== "function")
  ) {
    return null;
  }

  let out: RecordString<(e: Event) => void> | null = null;

  Object.keys(props).forEach((key: string) => {
    const item = props[key];

    if (EventKeys.includes(key) && typeof item === "function") {
      if (!out) out = {};
      const originalHandler = item;
      out[key] = (e: Event): null => {
        originalHandler(data, index, e);

        return null;
      };
    }
  });

  return out;
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
};

const renderIcon = (data: Payload, inactiveColor?: string) => {
  const halfSize = SIZE / 2;
  const sixthSize = SIZE / 6;
  const thirdSize = SIZE / 3;
  const color = data.inactive ? inactiveColor : data.color;
  const preferredIcon = data.type;

  if (preferredIcon === "none") {
    return null;
  }
  if (preferredIcon === "plainline") {
    return (
      <line
        strokeWidth={4}
        fill="none"
        stroke={color}
        strokeDasharray={data.payload?.strokeDasharray}
        x1={0}
        y1={halfSize}
        x2={SIZE}
        y2={halfSize}
        className="recharts-legend-icon"
      />
    );
  }
  if (preferredIcon === "line") {
    return (
      <path
        strokeWidth={4}
        fill="none"
        stroke={color}
        d={`M0,${halfSize}h${thirdSize}
          A${sixthSize},${sixthSize},0,1,1,${2 * thirdSize},${halfSize}
          H${SIZE}M${2 * thirdSize},${halfSize}
          A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
        className="recharts-legend-icon"
      />
    );
  }
  if (preferredIcon === "rect") {
    return (
      <path
        stroke="none"
        fill={color}
        d={`M0,${SIZE / 8}h${SIZE}v${(SIZE * 3) / 4}h${-SIZE}z`}
        className="recharts-legend-icon"
      />
    );
  }
  if (React.isValidElement(data.legendIcon)) {
    const iconProps = { ...data };
    delete iconProps.legendIcon;
    return React.cloneElement(data.legendIcon, iconProps);
  }

  return (
    <Symbols
      fill={color}
      cx={halfSize}
      cy={halfSize}
      size={SIZE}
      sizeType="diameter"
      type={preferredIcon ?? "circle"}
    />
  );
};

const renderItems = (props: Props) => {
  const { payload, iconSize, layout, formatter, inactiveColor } = props;
  const viewBox = { x: 0, y: 0, width: SIZE, height: SIZE };
  const itemStyle = {
    display: layout === "horizontal" ? "inline-block" : "block",
    marginRight: 10,
  };
  const svgStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4,
  };

  return payload?.map((entry, i) => {
    const finalFormatter = entry.formatter || formatter;
    const className = clsx({
      "recharts-legend-item": true,
      [`legend-item-${i}`]: true,
      inactive: entry.inactive,
    });

    if (entry.type === "none") {
      return null;
    }

    const entryValue = typeof entry.value !== "function" ? entry.value : null;

    const color = entry.inactive ? inactiveColor : entry.color;

    return (
      <li
        className={className}
        style={itemStyle}
        key={`legend-item-${hashString(entryValue)}`}
        {...adaptEventsOfChild(props as RecordString<unknown>, entry, i)}
      >
        <Surface
          width={iconSize ?? 10}
          height={iconSize ?? 10}
          viewBox={viewBox}
          style={svgStyle}
        >
          {renderIcon(entry, inactiveColor)}
        </Surface>
        <span className="recharts-legend-item-text" style={{ color }}>
          {finalFormatter ? finalFormatter(entryValue, entry, i) : entryValue}
        </span>
      </li>
    );
  });
};

export function CustomRechartsLegend(props: Props) {
  const { payload, layout, align } = props;

  if (!payload?.length) {
    return null;
  }

  const finalStyle = {
    padding: 0,
    margin: 0,
    textAlign: layout === "horizontal" ? align : "left",
  };

  return (
    <ul className="recharts-default-legend" style={finalStyle}>
      {renderItems(props)}
    </ul>
  );
}
