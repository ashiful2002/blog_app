import { ReactNode } from "react";

const ContactLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1>this is contact layout</h1>
      {children}
    </div>
  );
};

export default ContactLayout;
