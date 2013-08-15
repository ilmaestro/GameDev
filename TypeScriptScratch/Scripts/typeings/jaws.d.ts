// Jaws Game Engine TypeScript Definitions
// Author: Matt Greene (Deis)
// 

// Jaws.JS Core Classes

interface Animation {
    // Fields
    bounce: boolean;
    frame_direction: number;
    frame_duration: number;
    frame_size;
    frames;
    index: number;
    loop: boolean;
    offset: number;
    on_end: Function;
    orientation: string;
    // Methods
    atFirstFrame(): boolean;
    atLastFrame(): boolean;
    currentFrame(): number;
    next(): number;
    slice(start, stop): Animation;
    toString(): string;
    update();
}

interface GameLoop {
    // Fields
    fps: number;
    tick_duration: number;
    ticks: number;
    // Methods
    loop();
    pause();
    runtime(): number;
    start();
    stop();
    unpause();
}

interface Parallax {
    // Fields
    camera_x: number;
    camera_y: number;
    repeat_x: boolean;
    repeat_y: boolean;
    scale: number;
    // Methods
    addLayer(options);
    draw(options);
    toString(): string;
}

interface ParallaxLayer extends Sprite {
    // Fields
    damping: number;
}

interface Rect {
    collidePoint(x: number, y: number): boolean;
    collideRect(rect: Rect): boolean;
    draw();
    getPosition(): Array;
    move(x: number, y: number);
    moveTo(x: number, y: number);
    resize(width: number, height: number);
    resizeTo(width: number, height: number);
}

interface Sprite {
    // Fields
    alpha: number;
    anchor: string;
    angle: number;
    flipped: boolean;
    image: any;
    scale_image: number;
    x: number;
    y: number;

    // Methods
    asCanvas(): HTMLCanvasElement;
    asCanvasContext(): CanvasRenderingContext2D;
    attributes(): Array;
    draw();
    flip();
    move(x, y);
    moveTo(x, y);
    rect(): Rect; // TODO: Return Type
    resize(width: number, height: number);
    resizeTo(width: number, height: number);
    rotate(value: number);
    rotateTo(value: number);
    scaleAll(value: number);
    scaleHeight(value: number);
    scaleImage(factor: number);
    scaleTo(value: number);
    scaleWidth(value: number);
    setAnchor(value: number);
    setBottom(value: number);
    setHeight(value: number);
    setImage(value: number);
    setLeft(value: number);
    setRight(value: number);
    setTop(value: number);
    setWidth(value: number);
    setX(value: number);
    setY(value: number);
    toJSON(): Array;
}

interface SpriteList {
    // Methods
    at(index: number): any;
    concat(): SpriteList;
    deleteIf(condition);
    draw();
    drawIf(condition);
    every(): boolean;
    filter(): Array;
    forEach();
    indexOf(searchElement, fromIndex: number): number;
    isSpriteList(): boolean;
    join(separator?: string): string;
    lastIndexOf(): number;
    load(objects: Sprite[]);
    load(objects: string);
    load(objects: any);
    map(): Array;
    pop(): Sprite;
    push(object): number;
    reduce(): any;
    reduceRight(): any;
    remove(obj);
    removeIf(condition);
    reverse();
    shift(): Sprite;
    slice(start: number, end: number): Sprite;
    some(callback: Function): boolean;
    sort(callback: Function);
    splice(index: number): SpriteList;
    splice(index: number, howMany: number): SpriteList;
    unshift(): number;
    update();
    updateIf(condition);
    updateLength();
    valueOf(): string;
}

interface SpriteSheet {
    // Fields
    frame_size: Array;
    frames: Array;
    offset: number;
    orientation: string;
    scale_image: number;
}

interface TileMap {
    // Fields
    cell_size: Array;
    size: Array;
    sortFunction: Function;
    // Methods
    all(): Array;
    at(x, y): Array;
    atRect(rect: Rect): Array;
    cell(col, row): Array;
    clear();
    findPath(start_position, end_position, inverted): Array;
    push(obj: any);
    push(obj: Array);
    pushAsPoint(obj: any);
    pushAsPoint(obj: Array);
    pushAsRect(obj: any, rect: Rect);
    pushAsRect(obj: Array, rect: Rect);
    pushToCell(col: number, row: number, obj: any);
    pushToCell(col: number, row: number, obj: Array);
    sortCells(sortFunction: Function);
    toString(): string;
}

interface Viewport {
    // Fields
    height: number;
    max_x: number;
    max_y: number;
    width: number;
    x: number;
    y: number;
    // Methods
    apply(func);
    centerAround(item);
    draw(obj: Sprite);
    draw(obj: Array);
    drawIfPartlyInside(item);
    drawTileMap(tile_map: TileMap);
    forceInside(item, buffer: number);
    forceInsideVisibleArea(item, buffer: number);
    isAbove(item): boolean;
    isBelow(item): boolean;
    isInside(item): boolean;
    isLeftOf(item): boolean;
    isOutside(item): boolean;
    isPartlyInside(item): boolean;
    isRightOf(item): boolean;
    move(x: number, y: number);
    moveTo(x: number, y: number);
}

declare var jaws: {
    // Fields
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    height: number;
    mouse_x: number;
    mouse_y: number;
    width: number;
    // Static Methods
    clear(): void;
    collideCircles(object1, object2): Array;
    collideManyWithMany(list1, list2): Array;
    collideOneWithOne(object1, object2): Array;
    distanceBetween(object1, object2);
    forceArray(object): Array;
    forceInsideCanvas(item);
    getUrlParameters(): Array;
    imageToCanvas(image): any; // Needs return type
    isArray(object): boolean;
    isCanvas(object): boolean;
    isDrawable(object): boolean;
    isFunction(object): boolean;
    isImage(object): boolean;
    isOutsideCanvas(item): boolean;
    isString(object): boolean;
    log(msg, append);
    on_keydown(key, callback);
    on_keyup(key, callback);
    parseOptions(object, options, defaults);
    pressed(key): boolean;
    preventDefaultKeys(array_of_strings);
    start(game_state, options?, game_stat_setup_options?);
    switchGameState(game_state, options, game_stat_setup_options);
    unpack();

    Animation: {
        new (options: any): Animation;
    };

    GameLoop: {
        new (game_object, options: any, game_state_setup_options: any): GameLoop;
    };

    gfx: {
        retroScaleImage(image, factor: number): HTMLCanvasElement;
    };

    Parallax: {
        new (options): Parallax;
    };

    ParallaxLayer: {
        new (options): ParallaxLayer;
    };

    Rect: {
        new (x: number, y: number, width: number, height: number): Rect;
    };

    Sprite: {
        new (options: any): Sprite;
    };

    SpriteList: {
        new (options: any): SpriteList;
    };

    SpriteSheet: {
        new (options: any): SpriteSheet;
    };

    TileMap: {
        new (options: any): TileMap;
    };

    Viewport: {
        new (options: any): Viewport;
    };

    assets: {
        // Fields
        bust_cache: boolean;
        fuchia_to_transparent: boolean;
        // Methods
        add(src: string);
        add(src: string[]);
        getOrLoad(src: string, onload: Function, onerror: Function);
        isLoaded(src: string): boolean;
        isLoaded(src: string[]): boolean;
        isLoading(src: string): boolean;
        isLoading(src: string[]): boolean;
        load(src: string, onload: Function, onerror: Function);
        loadAll(options);
    };
}