import * as React from "react";
import { marked } from "marked";

interface Props {
  content: string;
  className?: string;
  children?: Node;
}

const MarkedContent: React.FC<Props> = ({ content, className, children }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
    ></div>
  );
};

export default MarkedContent;
