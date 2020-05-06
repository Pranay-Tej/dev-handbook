---
id: unity2d
title: Unity 2D
sidebar_label: Unity 2D
---

## Brackeys Tutorial

### Sorting Layers

- Select GameObject
- Add Layer in Inspecor
- Order In Layer
  - Objects in same sorting layer with highest value shown in the front

### Sprite Animation

- Select multiple Sprites and drag into scene view
- Unity creates animation file

### Box Collider 2D

- Apply collisions to box
- EditCollider option in Inspector
- TIP: AltClick to resize with scale

### Rigid Body 2D

- Apply physics to box (ex: gravitation)

### Tile Workflow

- Source: <https://www.youtube.com/watch?v=ryISV_nH8qw>
- Disable Anti-Aliasing to disable dark lines on tile edges
- Edit ProjectSetings Quality AntiAliasing
- Create 2DObject Tilemap
- Set GridCellSize
- Window 2D TilePalette
- Create Palette
- Save in a folder
- Select Parent Tile and Drag into Palette
- Save in Tiles folder
- Select a tile
- Select brush tool
- Paint in scene view
- Set PixelsPerUnit
  - Select All Tiles in ProjectView
  - Set to match with GridMapCellSize and Apply
- Importing an AllInOneSpriteImage psd
  - Import psd file
  - TextureType to Sprite 2D and UI
  - SpriteMode to Multiple importing multiple sprites
  - Set PixelPerUnit to size of each tile in imported tiles
  - FilterMode to Point (avoid blurred tiles)
  - SpriteEditor
  - Slice
  - Type GridByCellSize
  - Set PixelSize to each tile size (according to download page)
  - Compression to None

### Tools

- TIP: Multiple tiles can be selected at once
- TIP: ShiftClick to erase while using BrushTool
- BoxTool: Fill rectangular part with a tile
- TIP: CtrlClick to use MarqueeTool
- MarqeeTool select an existing tile in scene to paint with
- BucketTool fill holes with a tile

### Layers

- All empty spaces in tiles are transparent
- Create different TileMaps in Grid to paint on top
- Set OrderInLayer
- Select TileMap in TilePalette with ActiveTileMap option
- Example: Paint RockTile over SandTile

### Player Movement

#### Collision

- Add BoxCollider at top
- CirceCollider2D at legs for smooth motion when climbing slant obstacles
- NOTE: When 2 colliders mix unity applies force to separate them
- TIP: RigidBody CollisionDetection Continuous
- Add RigidBody2D
  - Set Constraint FreezeRotation on Z
- TileSet
  - Add TileCollider2D

#### Movement

NOTE: If you add a velocity to your body, you're ignoring any mass that the body has. It simply sets it going without considering how heavy the body is. If you add a force however, you're taking the mass of the body into account.

Brackey Tutorial

- Import script
- Add 2 empty object as children to PlayerObject
- Add them to CeilingCheck and GroundCheck to Script fields
- Freeze rotation Z
- Add Rigidbody2D
- CollisionDetection Continuous
- Increase GravityScale to 3 for player
- Add BoxCollider and CircleCollider
- Box for body Circle for legs for smooth motion at slant regions
- take player input GetAxisRaw Horizontal
- call CharacterController2D.Move function
- Time.fixedDeltaTime
- take GetKeyDown Jump
- TIP: Take inputs in Update method and then act upon physics in FixedUpdate to avoid non-responsive input
- pass jump bool value to Move function
- create PhysicsMaterial2D
- Friction 0
- Assign to Player BoxCollider2D
- Add Crouch in ProjectSettings Input
- Drag BoxCollider2D into CharacterController2D CrouchDisbaleCollider
- BUG: change if(!crouch) to if(crouch)

    ```cs
    private void Flip()
        {
            // Switch the way the player is labelled as facing.
            m_FacingRight = !m_FacingRight;
            // Multiply the player's x local scale by -1.
            // Vector3 theScale = transform.localScale;
            // theScale.x *= -1;
            // transform.localScale = theScale;
            // Rotate player
            transform.Rotate(0f, 180f, 0f);
        }

    ```

- FIX: Flip character using rotate instead of transforming scale by negative

    ```cs
    // Multiply the player's x local scale by -1.
            // Vector3 theScale = transform.localScale;
            // theScale.x *= -1;
            // transform.localScale = theScale;

    FIX:
            // Rotate player
            transform.Rotate(0f, 180f, 0f);
    ```

- Use KeyUp and KeyDown to detect continuous keypress

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

Method 1: AddForce

- TIP: Use FixedUpate when making changes to physics

    ```cs
    public Rigidbody2D rb;
    public float speed = 200.0f;
    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }
    private void FixedUpdate() {
        float moveHorizontal = Input.GetAxisRaw("Horizontal");
        Vector2 movement = new Vector3(moveHorizontal, 0.0f);
        rb.AddForce(movement * speed);
    }
    ```

Unity Microgame Platformer Method

- Use kinematic object and add gravity manually ?? Physics2D.gravity

### Animation

RecordMode

- Select GameObject
- Open Animation Window
- Create New
- Start RecordMode
- Select KeyFrame
- Make Changes
- Select next KeyFrame
- Repeat
- TIP: Scripts can be added in AnimationTimeline. Script should be on same GameObject being animated.

### Animator

Brackey Tutorial

- Select Player
- Window Animation
- Add Clip
- Save animation
- AnimationWindow Options ShowSamples
- Drag Sprites into Animation window
- Decrease Samples value for smooth animation
- To Set Default Animation
- Window Animation Animator
- RightClick Animation
- SetAsLayerDefaultState
- Transition
- RightClick Make Transition
- Add Parameter in AnimatorLeftMenu
- Select Transition
- Add Condition for Transition
- Ex: Speed greater than 0.1
- HasExitTime (OFF for 2D games)
  - If Has Exit Time is true (the checkbox is enabled) then after a certain amount of time has passed the transition will automatically be taken and the state machine will play the next state
- Settings TransitionDuration (0 for 2D games)
- GetComponent Animator in Script
- Set Parameters with Animator("Key", Value)
- Set Triggers for Animator
  - From AnyState if triggered play this animation
  - Exit time has to be set for animations triggered by Triggers as there is no exit condition
- Animations can also be set to start from AnyState
- ParametricConditions can be combined
- For Landing detection use Brackey's Controller2D script's OnLandEvent
- TIP: Transition Settings CanTransitionToSelf OFF if animation is not playing fully
- For Crouch Detection use Brackey's Controller2D script's OnLandEvent

### Camera Cinemachine

Lerp?

Brakcey

- Window PackageManager
- Install Cinemachine
- TopMenu
- Cinemachine Cinemachine2D
- Drag Player Into Follow field of Cinemachine VirtualCamera InspectorWindow
- Damping Smoothing
- Deadzones area in which camera will allow player movement without following
