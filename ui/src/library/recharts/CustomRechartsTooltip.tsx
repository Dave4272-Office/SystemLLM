import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

function defaultFormatter<TValue extends ValueType>(value: TValue) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1])
    ? (value.join(" ~ ") as TValue)
    : value;
}

export const CustomRechartsTooltip = <
  TValue extends ValueType,
  TName extends NameType,
>(
  props: TooltipProps<TValue, TName> & { activeKey: string }
) => {
  const {
    contentStyle = {},
    itemStyle = {},
    labelStyle = {},
    payload,
    formatter,
    wrapperClassName,
    labelClassName,
    label,
    labelFormatter,
    accessibilityLayer = false,
  } = props;

  const renderContent = () => {
    if (payload?.length) {

      const items = payload.map((entry, i) => {
        if (entry.type === "none") {
          return null;
        }

        const finalFormatter = entry.formatter || formatter || defaultFormatter;
        const { value, name } = entry;
        let finalValue: React.ReactNode = value;
        let finalName: React.ReactNode = name;
        if (finalFormatter && finalValue != null && finalName != null) {
          const formatted = finalFormatter(value!, name!, entry, i, payload);
          if (Array.isArray(formatted)) {
            [finalValue, finalName] = formatted;
          } else if (formatted != null) {
            finalValue = formatted;
          } else {
            return null;
          }
        }

        const finalItemStyle = {
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color ?? "#000",
          ...itemStyle,
        };

        return {
          name: finalName,
          value: (
            <div style={finalItemStyle}>
              {isNumOrStr(finalName) ? (
                <span className="recharts-tooltip-item-name">{finalName}</span>
              ) : null}
              {isNumOrStr(finalName) ? (
                <br />
              ) : null}
              <span className="recharts-tooltip-item-value">{finalValue}</span>
              <span className="recharts-tooltip-item-unit">
                {entry.unit || ""}
              </span>
            </div>
          ),
        };
      });

      return <>{items.find((item) => item?.name === props.activeKey)?.value}</>;
    }

    return null;
  };

  const finalStyle: React.CSSProperties = {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap",
    ...contentStyle,
  };
  const finalLabelStyle = {
    margin: 0,
    ...labelStyle,
  };
  const hasLabel = !isNullish(label);
  let finalLabel = hasLabel ? label : "";
  const wrapperCN = clsx("recharts-custom-tooltip", wrapperClassName);
  const labelCN = clsx("recharts-tooltip-label", labelClassName);

  if (hasLabel && labelFormatter && payload !== undefined && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }

  const accessibilityAttributes = accessibilityLayer
    ? ({
        role: "status",
        "aria-live": "assertive",
      } as HTMLAttributes<HTMLDivElement>)
    : {};

  return (
    <div className={wrapperCN} style={finalStyle} {...accessibilityAttributes}>
      <p className={labelCN} style={finalLabelStyle}>
        {React.isValidElement(finalLabel) ? finalLabel : `${finalLabel}`}
      </p>
      {renderContent()}
    </div>
  );
};

export const isNullish = (value: unknown): boolean => {
  return value === null || typeof value === "undefined";
};

export const isNan = (value: unknown): boolean => {
  // eslint-disable-next-line eqeqeq
  return typeof value == "number" && value != +value;
};

export const isPercent = (value: string | number): value is `${number}%` =>
  typeof value === "string" && value.indexOf("%") === value.length - 1;

export const isNumber = (value: unknown): value is number =>
  (typeof value === "number" || value instanceof Number) && !isNan(value);

export const isNumOrStr = (value: unknown): value is number | string =>
  isNumber(value as number) || typeof value === "string";
