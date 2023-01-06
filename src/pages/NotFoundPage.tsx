import React from "react";
import { Stack, Text } from "@fluentui/react";

const NotFoundPage: React.FunctionComponent = () => {
  return (
    <Stack horizontal horizontalAlign="center">
      <Text variant="xxLarge">404 Page Not Found</Text>
    </Stack>
  );
};

export default NotFoundPage;