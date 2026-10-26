/* =========================================
   MULTICONFORT IA
   RUBIK TOUCH - MOTOR INICIAL
   ========================================= */

(() => {
    const cube = document.getElementById("rubik-cube");

    if (!cube) {
        console.error("No se encontró #rubik-cube");
        return;
    }

    const faceNames = [
        "front", "back", "right",
        "left", "top", "bottom"
    ];

    const colors = {
        front: "red",
        back: "orange",
        right: "blue",
        left: "green",
        top: "white",
        bottom: "yellow"
    };

    const faces = {};
    const stickers = [];
    const initialState = [];
    let state = [];
    let lastMove = null;
    let busy = false;

    /*
     * Cada pegatina tiene:
     * posición XYZ, normal XYZ y
     * posición dentro de la cara.
     */

    function descriptor(face, row, col) {
        const x = col - 1;
        const y = 1 - row;

        switch (face) {
            case "front":
                return {
                    x, y, z: 1,
                    nx: 0, ny: 0, nz: 1
                };

            case "back":
                return {
                    x: -x, y, z: -1,
                    nx: 0, ny: 0, nz: -1
                };

            case "right":
                return {
                    x: 1, y, z: -x,
                    nx: 1, ny: 0, nz: 0
                };

            case "left":
                return {
                    x: -1, y, z: x,
                    nx: -1, ny: 0, nz: 0
                };

            case "top":
                return {
                    x, y: -1, z: -y,
                    nx: 0, ny: -1, nz: 0
                };

            case "bottom":
                return {
                    x, y: 1, z: y,
                    nx: 0, ny: 1, nz: 0
                };
        }
    }

    function keyOf(p) {
        return [
            p.x, p.y, p.z,
            p.nx, p.ny, p.nz
        ].join(",");
    }

    const indexByPosition = new Map();

    faceNames.forEach(face => {
        const element = cube.querySelector(
            ".cube-face." + face
        );

        if (!element) {
            throw new Error("Falta la cara: " + face);
        }

        const cells = Array.from(
            element.querySelectorAll("span")
        );

        if (cells.length !== 9) {
            throw new Error(
                "La cara " + face +
                " debe contener nueve pegatinas."
            );
        }

        faces[face] = cells;

        cells.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;

            const sticker = {
                face,
                row,
                col,
                position: descriptor(face, row, col)
            };

            const id = stickers.length;

            stickers.push(sticker);

            indexByPosition.set(
                keyOf(sticker.position),
                id
            );

            const color = getComputedStyle(cell)
                .backgroundColor;

            initialState.push(color);
        });
    });

    state = initialState.slice();

    function render() {
        stickers.forEach((sticker, index) => {
            faces[sticker.face][
                sticker.row * 3 + sticker.col
            ].style.backgroundColor = state[index];
        });
    }

    /*
     * Rotaciones de 90 grados sobre
     * los ejes X, Y y Z.
     */

    function rotateVector(p, axis, direction) {
        let { x, y, z } = p;

        for (let i = 0; i < 3; i++) {
            if (direction === 1) {
                if (axis === "x") {
                    [y, z] = [-z, y];
                } else if (axis === "y") {
                    [x, z] = [z, -x];
                } else {
                    [x, y] = [-y, x];
                }
            } else {
                if (axis === "x") {
                    [y, z] = [z, -y];
                } else if (axis === "y") {
                    [x, z] = [-z, x];
                } else {
                    [x, y] = [y, -x];
                }
            }
        }

        return { ...p, x, y, z };
    }

    const moveDefinitions = {
    R: { axis: "x", layer: 1, direction: -1 },
    L: { axis: "x", layer: -1, direction: 1 },
    U: { axis: "y", layer: -1, direction: 1 },
    D: { axis: "y", layer: 1, direction: -1 },
    F: { axis: "z", layer: 1, direction: -1 },
    B: { axis: "z", layer: -1, direction: 1 }
};

    function applyMove(notation) {
        const match = notation.match(/^([RLUDFB])([2']?)$/);

        if (!match) {
            console.warn("Movimiento inválido:", notation);
            return false;
        }

        const face = match[1];
        const suffix = match[2];
        const def = moveDefinitions[face];

        const direction = suffix === "'"
            ? -def.direction
            : def.direction;

        const turns = suffix === "2" ? 2 : 1;

        for (let turn = 0; turn < turns; turn++) {
            const next = state.slice();

            stickers.forEach((sticker, sourceIndex) => {
                const p = sticker.position;

                if (p[def.axis] !== def.layer) {
                    return;
                }

                const rotatedPosition = rotateVector(
                    p,
                    def.axis,
                    direction
                );

                const rotatedNormal = rotateVector(
                    {
                        x: p.nx,
                        y: p.ny,
                        z: p.nz
                    },
                    def.axis,
                    direction
                );

                const target = {
                    ...rotatedPosition,
                    nx: rotatedNormal.x,
                    ny: rotatedNormal.y,
                    nz: rotatedNormal.z
                };

                const targetIndex = indexByPosition.get(
                    keyOf(target)
                );

                if (targetIndex === undefined) {
                    throw new Error(
                        "No se pudo localizar una pegatina."
                    );
                }

                next[targetIndex] = state[sourceIndex];
            });

            state = next;
        }

        lastMove = face;
        render();

        return true;
    }

    /*
     * Mezcla aleatoria de 25 movimientos.
     */

    function scramble() {
        if (busy) return;

        const names = Object.keys(moveDefinitions);
        const sequence = [];
        let previousFace = "";

        while (sequence.length < 25) {
            const face = names[
                Math.floor(Math.random() * names.length)
            ];

            if (face === previousFace) continue;

            const suffixes = ["", "'", "2"];
            const suffix = suffixes[
                Math.floor(Math.random() * suffixes.length)
            ];

            sequence.push(face + suffix);
            previousFace = face;
        }

        sequence.forEach(move => applyMove(move));

        console.log(
            "Mezcla Rubik:",
            sequence.join(" ")
        );
    }

    /*
     * Regresar al estado resuelto.
     */

    function reset() {
        if (busy) return;

        state = initialState.slice();
        lastMove = null;
        render();

        console.log("Cubo reiniciado.");
    }

    /*
     * Conectar los botones existentes.
     */

    const buttons = document.querySelectorAll(
        ".controls button"
    );

    if (buttons.length >= 2) {
        buttons[0].addEventListener("click", scramble);
        buttons[1].addEventListener("click", reset);
    } else {
        console.warn(
            "No se encontraron los botones de control."
        );
    }

    /*
     * Teclado:
     * R L U D F B
     * Shift + letra = inverso
     * 2 = repetir el último giro dos veces
     */

    document.addEventListener("keydown", event => {
        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey ||
            event.repeat
        ) {
            return;
        }

        if (/^(INPUT|TEXTAREA|SELECT)$/.test(
            event.target.tagName
        )) {
            return;
        }

        const key = event.key.toUpperCase();

        if (moveDefinitions[key]) {
            event.preventDefault();

            const notation = key + (
                event.shiftKey ? "'" : ""
            );

            applyMove(notation);
            return;
        }

        if (key === "2" && lastMove) {
            applyMove(lastMove + "2");
        }
    });

    /*
     * API disponible para las siguientes etapas.
     */

    window.RubikTouch = {
        move: applyMove,
        scramble,
        reset,
        getState: () => state.slice()
    };

    render();

    console.log(
        "MULTICONFORT Rubik Touch: motor inicial activo."
    );
})();