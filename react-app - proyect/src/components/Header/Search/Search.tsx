import { TextField, IconButton, InputAdornment, Paper, Fade } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./search.module.css";

interface SearchComponentProps {
  isSearchActive: boolean;
  setIsSearchActive: (isSearchActive: boolean) => void;
}

export const SearchComponent = ({ isSearchActive, setIsSearchActive }: SearchComponentProps) => (
  <div className={styles.searchBar}>
    <Fade in={isSearchActive}>
    <Paper
        component="form"
        sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            margin: "0 auto",
            backgroundColor: "#333", // Fondo gris oscuro
            color: "white", // Texto blanco
        }}
        elevation={4}
    >
        <TextField
        variant="standard"
        placeholder="Buscar..."
        fullWidth
        InputProps={{
            disableUnderline: true,
            style: { color: "white" }, // Color del texto
            startAdornment: (
            <InputAdornment position="start">
                <IconButton sx={{ color: "white" }}>
                <SearchIcon />
                </IconButton>
            </InputAdornment>
            ),
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchActive(false)} sx={{ color: "white" }}>
                <CloseIcon />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
    </Paper>
    </Fade>
  </div>
)
