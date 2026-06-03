import { Button } from "@mantine/core";
import { t } from "i18next";

function Page() {
    return (
        <Button>
            {t("common.helloWorld")}
        </Button>
    );
}

export default Page;