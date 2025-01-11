import CommonLayout from "@/components/common/CommonLayout";
import Copyright from "@/components/common/Copyright";
import {
  SidebarFooterAccount,
  ToolbarAccountOverride,
} from "@/components/common/SidebarFooterAccount";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import * as React from "react";

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardLayout
      slots={{
        toolbarAccount: ToolbarAccountOverride,
        sidebarFooter: SidebarFooterAccount,
      }}
    >
      <PageContainer maxWidth={false} fixed={false}>
        <CommonLayout>{props.children}</CommonLayout>
        <Copyright sx={{ my: 4 }} />
      </PageContainer>
    </DashboardLayout>
  );
}
