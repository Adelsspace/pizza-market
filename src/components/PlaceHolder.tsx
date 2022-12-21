import React from "react";
import ContentLoader from "react-content-loader";

const PlaceHolder: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="9" y="281" rx="10" ry="10" width="246" height="24" />
    <rect x="8" y="327" rx="10" ry="10" width="249" height="88" />
    <rect x="274" y="356" rx="0" ry="0" width="1" height="1" />
    <rect x="195" y="298" rx="0" ry="0" width="1" height="0" />
    <rect x="2" y="438" rx="10" ry="10" width="95" height="30" />
    <rect x="90" y="458" rx="0" ry="0" width="1" height="7" />
    <rect x="114" y="432" rx="31" ry="31" width="152" height="45" />
  </ContentLoader>
);

export default PlaceHolder;
