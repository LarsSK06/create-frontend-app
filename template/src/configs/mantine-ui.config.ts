import { createTheme, PaperProps } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MANTINE_UI_CONFIG = createTheme({
    fontFamily: inter.style.fontFamily,
    components: {
        Paper: {
            defaultProps: {
                withBorder: true
            } satisfies PaperProps
        }
    }
});

export default MANTINE_UI_CONFIG;