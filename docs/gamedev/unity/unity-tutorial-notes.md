---
id: unity-tutorial-notes
title: Unity Tutorial Notes
sidebar_label: Unity Tutorial Notes
---

## Brackey's Tutorial - 2D Game

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
    public void Move(float move, bool crouch, bool jump)
    {
        // If crouching, check to see if the character can stand up
        if (crouch)
        {
            // If the character has a ceiling preventing them from standing up, keep them crouching
            if (Physics2D.OverlapCircle(m_CeilingCheck.position, k_CeilingRadius, m_WhatIsGround))
            {
                crouch = true;
            }
        }
    }

    ```

- FIX: Flip character using rotate instead of transforming scale by negative

    ```cs
    private void Flip()
        {
            // Switch the way the player is labelled as facing.
            m_FacingRight = !m_FacingRight;
            // Multiply the player's x local scale by -1.
            // Vector3 theScale = transform.localScale;
            // theScale.x *= -1;
            // transform.localScale = theScale;
            
            //FIX:
            // Rotate player
            transform.Rotate(0f, 180f, 0f);
        }
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

### Animation

#### RecordMode

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

### Camera

#### Smooth Camera

Lerp?

#### Cinemachine

- Window PackageManager
- Install Cinemachine
- TopMenu
- Cinemachine Cinemachine2D
- Drag Player Into Follow field of Cinemachine VirtualCamera InspectorWindow
- Damping Smoothing
- Deadzones area in which camera will allow player movement without following


---

## Unity Learn - Beginner 2D - Ruby's Adventure

### Limit Framerate

```cs
void Start()
   {
       //QualitySettings.vSyncCount = 0;
       //Application.targetFrameRate = 10;
   }
```

### Fake Perspective

- You need to “fake” the perspective. Instinctively, players expect the character to draw first when it is in front of the cube and last when it is behind the cube.
- In more technical terms, what you need to do is instruct Unity to draw GameObjects depending on their y coordinate (remember, y is the vertical axis and x is the horizontal one).
- Edit ProjectSettings TransparencySortMode Custom
- TransparencySortAxis 0 1 0
- This tells Unity to draw Sprites based on their position on the y-axis.
- GameObject SpriteRenderer
- SpriteSortPoint Pivot
- Open Sprite in ProjectPane
- Select Pivot to Bottom or Open Sprite Editor to Edit Pivot Point (Blue Circle in Sprite).
- Adjust Colliders based on Game's Perspective.
- Ex: Ruby in tutorial has collider only on legs so that torso appears to be in front of other objects.
- Optimization
  - Each tile is a separate Collider.
  - Select TileMap GameObject
  - Add CompositeCollider2D
  - Rigidbody2D is added automatically
  - Set Rigidbody2D Type to Static
  - Enable UsedByComposite in TileMapCollider2D
  - **TIP**: Setting this to Static will stop your world from moving. It also helps the Physics System optimize computation, as it now knows that Rigidbody can’t move.

### C# Properties

- Define a getter function for variable

    ```cs
    public int health { get { return currentHealth; }}
    private int currentHealth;
    ```

### Mathf.Clamp()

- Clamps the given value between the given minimum float and maximum float values. Returns the given value if it is within the min and max range.

    ```cs
    Clamp(float value, float min, float max);
    ```

### Collisions in TileMap

- Add TileMapCollider2D to TileMap GameObject.
- Go to Tiles Location (Location set when dragging tiles into TilePalette) in ProjectPanel.
- Select Tile
- CollisionType None or Sprite

### DamageZones

- Appply continuous damage
  - Use ```OnTriggerStay2D``` on DamagableObject to apply damage entire time player stays in the collider.
  - Set Player Rigidbody2D ```SleepingMode``` to ```NeverSleep```.
- Make Player Invincible for short period of time to avoid GameOver in less frames because of continuous collisions.
  
    ```cs
    public float timeInvincible = 2.0f;
    bool isInvincible;
    float invincibleTimer;

    void Update()
    {
        if (isInvincible)
        {
            invincibleTimer -= Time.deltaTime;
            if (invincibleTimer < 0){
                isInvincible = false;
            }
        }
    }

    public void ChangeHealth(int amount)
    {
        if (amount < 0)
        {
            if (isInvincible){
                return;
            }
            isInvincible = true;
            invincibleTimer = timeInvincible;
        }
        currentHealth = Mathf.Clamp(currentHealth + amount, 0, maxHealth);
        Debug.Log(currentHealth + "/" + maxHealth);
    }
    ```

---

## John Lemon

### Animations

#### Root Motion

Important Note!  The GameObject called Root in the JohnLemon Prefab’s hierarchy refers to the root of its skeleton, and is not the actual root GameObject.  The root GameObject is whichever GameObject the Animator component is on — in this case, the GameObject called JohnLemon.

#### Update Loop

An Animator component can change when it performs its Update. By default it performs this in line with rendering.  This means that the Animator is moving the character in Update and the Rigidbody is simultaneously moving the character in Fixed Update.  This is what’s causing your problem.

### Movement

:::note
This means that your character will move faster diagonally than it will along a single axis.  In order to make sure this doesn’t happen, you need to ensure the movement vector always has the same magnitude.  You can do this by normalizing it.  Normalizing a vector means keeping the vector’s direction the same, but changing its magnitude to 1.  
:::

```cs
 m_Movement.Set(horizontal, 0f, vertical);
 m_Movement.Normalize ();
```

#### Turn Speed

### Camera

#### Cinemachine

Refer Tutorial

#### Post Processing

Refer Tutorial

### UI

#### Event System

This GameObject has components attached which work together to allow any UI elements on the screen to interact with user input

#### Canvas RenderMode Settings

- Screen Space - Overlay, where the Canvas fills the screen and all the UI elements of the canvas are rendered on top of everything else

- Screen Space - Camera, where the Canvas fills the screen but it is rendered to a specific camera and is subject to distance from the camera

- World Space, where the UI exists in the Scene and is rendered in front or behind other objects (for example, name tags above characters in a 3D world)

#### Strecth UI to entire screen

Set RectTransform of UI Anchors Min 0 0 and Max 1 1. Then set the Left, Top, Right and Bottom properties to 0.

#### Implement a Timeout

```cs
using UnityEngine;

public class GameEnding : MonoBehaviour
{
    public float fadeDuration = 1f;
    public float displayImageDuration = 1f;
    public GameObject player;
    public CanvasGroup exitBackgroundImageCanvasGroup;

    bool m_IsPlayerAtExit;
    float m_Timer;

    void OnTriggerEnter (Collider other)
    {
        if (other.gameObject == player)
        {
            m_IsPlayerAtExit = true;
        }
    }

    void Update ()
    {
        if(m_IsPlayerAtExit)
        {
            EndLevel ();
        }
    }

    void EndLevel ()
    {
        m_Timer += Time.deltaTime;

        exitBackgroundImageCanvasGroup.alpha = m_Timer / fadeDuration;

        if(m_Timer > fadeDuration + displayImageDuration)
        {
            Application.Quit ();
        }
    }
}
```

#### Canvas Group

The Canvas Group can be used to control certain aspects of a whole group of UI elements from one place without needing to handle them each individually. The properties of the Canvas Group affect the GameObject it is on as well as all children.

---

## Unity Learn - 2D Character Controller
