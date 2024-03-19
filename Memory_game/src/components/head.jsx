export default function Head({puntuacion}) {
    return(
        <header>
            <h1>🧠 Welcome to the memory game 🧠</h1>
            <a href="https://toog-inc.netlify.app/">Link a TooG inc page</a>
            <h2>(Images on the page: TooG inc) Click on each image without repeating to win 😁</h2>
            <h2 className="Puntuacion">Score: {puntuacion}</h2>
        </header>
    );
}