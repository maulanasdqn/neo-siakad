import { FC, PropsWithChildren, ReactElement } from "react";

const AuthTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return <>{children}</>;
};

export default AuthTemplate;
