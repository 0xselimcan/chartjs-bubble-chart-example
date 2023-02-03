import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"


const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {


    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )


}

export default CustomThemeProvider