---
id: unity
title: Unity
sidebar_label: Unity
---

## Courses

- - -

## Topics

### Setup

dotNET Core SDK
Visual Studio Code

- C#
- Debugger for Unity
- Unity Code Snippets
- Unity Snippets
- Unity Tools

### Git

-   <https://github.com/github-for-unity/Unity/blob/master/docs/using/quick-guide.md>
-   <https://medium.com/@j0hnm4r5/git-with-unity-92ca7854ea3d>
- Window Asset Store
- GitHub for Unity
- Window GitHub

### Tips

- Tinting editor
  - Edit Preferences Color PlayModeTint
- Maximize window
  - HoverOverAWindow Shift Space
- Align with view
  - use scene view to align camera
  - select camera
  - GameObject AlignWithView
- Locking Layers
  - Create Layer
  - Asssign objects to that layer
  - Lock layer for player selection
- Physics Calculation Time
  - Edit ProjectSettings Time FixedTimeStamp 0.01
- Focus
  - Press F to focus on selected GameObject
  - DoubleTap F to lock onto the object (Shift F)
- Delay to a function
  - Invoke(string_function_name, delay)
- While editing a value using mouse in Inspector
  - use AltClick for precise increments
- **Avoid using GameObject.Find or FindWithTag**
  - <https://akbiggs.silvrback.com/please-stop-using-gameobject-find>
  - Use public variables and assing (drag) in UnityEditor
  - Example: Declare UI Text as public variables and drag them in UnityEditor Inspector
  - Example: Declare a GameManagerLogic Script as public variable and drag it in Inspector
  - **Drag mechanism does NOT work with prefabs!!**
- VisualStudio Auto Statement
  - DoubleTap TAB key to autofill syntax
- Snap to grid
  - CtrlClick Move
  - Edit SnapSettings
- ColorPicker
  - While colorpicker is active click on an object in SceneView to copy color
  - Also works when hovering over color outside UnityEditor
- Lock inspector for currently viewing object
  - lock symbol at top right
- Click ```?``` marks in Editor to directly open Documentation
- ExpandAll/ CollapseAll
  - AltClick
- Debug mode
  - view private variables in unity editor
  - Inspector DebugMode
- Range

    ```cs
    [Range(.1f, 2f)]
    public float jump_height = 1f
    ```
  - results in a slider in UnityInspector
- Save changes done in play mode
  - SelectComponent Inspector RightClick CopyValues
  - ExitPlayMode PasteValues
- Headers and Spaces

    ```cs
    [Header("Transoform")]
    public Vector3 position;

    [Space]

    [Header("Properties")]
    public float weight;
    ```
  - Creates in UnityEditor
- Region

    ```cs
    #region Variables
    public float health;
    public float weight;
    #endregion
    ```
  - Seperate secions of code as collapsible regions
- Tooltip

    ```cs
    [Tooltip("Player health")]
    public float health;
    ```
  - Shows tooltips in UnityEditor
- HideInInspector

    ```cs
    [HideInInspector]
    public float example;
    ```
  - Hides in UnityEditor
- SerializeField

    ```cs
    [SerializeField]
    private int health = 20;
    ```
  - Shows variable in UnityEditor

### Assets

Anima 2D

### Terminology

Materials

- Surface Material
- ProjectSettings Create Material
PhysicsMaterial
- Change Friction
- ProjectSettings Create PhysicsMaterial

Collisions

Collision

- Add ColliderComponent
- OnCollisionEnter(Collision)
- OnCollisionExit

Trigger

- Use for triggering events
- Physical collision is not simulated
- Objects will pass through each other
- OnTriggerEnter()
  - Act on trigger event
- OnTriggerEvent(Collider)
  - Access to the other collider object
  - Act on trigger event accordingly
  - Example:

    ```cs title="PlayerCollision"
    // PlayerCollision.cs
    private void OnTriggerEnter(Collider collider) {

            // Coins
            if(collider.tag == "Coin"){
                collider.gameObject.SetActive(false);
                IncreaseScore();
            }

            // LevelCompleteTrigger
            if(collider.tag == "LevelCompleteTrigger"){
                FindObjectOfType<GameManager>().CompleteLevel();
            }
        }
    ```

- TIP: DeActivate a game object using gameObject.SetActive(false);
- Example
  - A Box Collider Trigger which runs EndGame Script when player enters the box
- TIP: Disable Meshrenderer to make invisible triggers
- TIP: Use Icon on top left of Inspector to view invisible objects as icons

Lights

Fog

- Window Lights

UI

Brackey

- Create UI Element
- Canvas Object is necessary for UI to work
- Create Text in UI
- Enter 2D mode in SceneView
- Select Text and focus it in SceneView
- HorizontalOverflow Overflow
- Scale UI with screensize
  - Select Canvas
  - UI ScaleMode ScaleWithScreen SizeHeight
- Download Fonts
  - GoogleFonts
  - SelectFont
  - Download as zip file
  - Unzip
  - drag into Unity
  - Make a folder Fonts
- Dynamic Text
  - Add Script to Text Object

    ```cs
    using UnityEngine.UI
    public Text distanceText;
    public Transform playerTransformComponent;
    void Update()
    {
        distanceText.text = playerTransformComponent.position.z.ToString();
    }
    ```

- TIP: Canvas PixelPerfect
- Panel
- Create UI Panel
- SourceImage None
- Set Color
- Create UI Text
- TIP: AltClick to resize from center
- Button
- SourceImage None
- AddComponent Shadow
- X 0 Y -2
- To add functionality AddScript to UI Panel
- Add Panel to Button OnClick Field
- Select Function from The Script
- NOTE: Order of panels matters in Canvas

GameLogic

GameManager

- Create Empty object and use it to manage game logic

Tags

Access

- OnTriggerEnter
  - collider.gameObject.CompareTag(string)
- OnCollisionEnter
  - collision.collider.tag == string

Layers

Build Index

- File Build Settings
- Use for StartMenu Levels and EndCredits
- RestartLevel

```cs
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
```

- NextLevel

```cs
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
```

- NOTE: If there's no next level in build index editor will throw error
- Build a Credits (End) Level with Quit button

Player Input

- Axes
- Press
- Press and Hold

```cs
if (Input.GetButtonDown("Crouch"))
        {
            crouch = true;
        }
        else if (Input.GetButtonUp("Crouch"))
        {
            crouch = false;
        }
```

- Edit ProjectSettings Input

Prefabs

Brackey

Intro

- Drag from Hierarchy to Project to create a prefab
- Open PrefabMode my clicking right arrow in Heirarchy or DoubleClick prefab in ProjectTab
- Any changes to prefab will apply to instances in scene
- Any changes to a particular instance of prefab
  - will be highlighted in Inspector Overrides field
  - ApplyAll or RevertAll to changes
  - or Apply Revert Induvidual changes
Nested Prefabs
- Open prefab A in Hierarchy
- Drag existing prefab B into Heirarchy to make it a child of opened prefab A
Prefab Variants
- RightClick a prefab in Project tab
- Create PrefabVariant
- Example:
  - SwordPrefab
  - Variants: IceSword, FireSword
  - Changes to SwordPrefab will affect other variants

SpriteShapes

Lights

Pause Menu

- Use Time.timescale

```cs
public void TogglePauseMenu(){
        if(isPaused){
            // if the game is currently paused and user presses resume/esc
            Time.timeScale = 1;
            pauseMenuUI.SetActive(false);
            isPaused = false;
        }else{
            Time.timeScale = 0;
            pauseMenuUI.SetActive(true);
            isPaused = true;
        }
    }
```

- TIP: Use Time.timescale for time manipulations (slow mo)
