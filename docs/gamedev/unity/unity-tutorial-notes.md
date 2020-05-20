---
id: unity-tutorial-notes
title: Unity Tutorial Notes
sidebar_label: Unity Tutorial Notes
---

## Contents <!-- omit in toc -->

- [Brackey's Tutorial - 2D Game](#brackeys-tutorial---2d-game)
  - [Sorting Layers](#sorting-layers)
  - [Sprite Animation](#sprite-animation)
  - [Box Collider 2D](#box-collider-2d)
  - [Rigid Body 2D](#rigid-body-2d)
  - [Tile Workflow](#tile-workflow)
  - [Tools](#tools)
  - [Layers](#layers)
  - [Player Movement](#player-movement)
    - [Collision](#collision)
    - [Movement](#movement)
  - [Animation](#animation)
    - [RecordMode](#recordmode)
  - [Animator](#animator)
  - [Camera](#camera)
    - [Smooth Camera](#smooth-camera)
    - [Cinemachine](#cinemachine)
- [Unity Learn - Beginner 2D - Ruby's Adventure](#unity-learn---beginner-2d---rubys-adventure)
  - [Limit Framerate](#limit-framerate)
  - [Fake Perspective](#fake-perspective)
  - [C# Properties](#c-properties)
  - [Mathf.Clamp()](#mathfclamp)
  - [Collisions in TileMap](#collisions-in-tilemap)
  - [DamageZones](#damagezones)
  - [SpriteTiling Instead of Streching](#spritetiling-instead-of-streching)
  - [Animation](#animation-1)
  - [Animator](#animator-1)
    - [Blend Trees](#blend-trees)
  - [Look Direction](#look-direction)
    - [Using Matf instead of ```==``` for equality checks](#using-matf-instead-of--for-equality-checks)
    - [Normalizing Vectors](#normalizing-vectors)
  - [Instantiate](#instantiate)
    - [Quaternions](#quaternions)
    - [Awake](#awake)
  - [Layers](#layers-1)
    - [Layer Collision Matrix](#layer-collision-matrix)
  - [RigidBody Simulation](#rigidbody-simulation)
  - [Projectile Cleanup](#projectile-cleanup)
  - [Cinemachine](#cinemachine-1)
    - [Camera Bounds](#camera-bounds)
  - [Particle Effects](#particle-effects)
    - [OneTimeOnly Effects](#onetimeonly-effects)
  - [UI](#ui)
    - [Canvas](#canvas)
    - [Anchors](#anchors)
    - [Sprit Masking](#sprit-masking)
  - [NPC Dialogue](#npc-dialogue)
    - [Canvas - World Space](#canvas---world-space)
    - [Raycast](#raycast)
  - [Audio](#audio)
    - [Camera Audio Fix for 2D games (Attenuation Fix)](#camera-audio-fix-for-2d-games-attenuation-fix)
  - [Build](#build)
- [John Lemon](#john-lemon)
  - [Animations](#animations)
    - [Root Motion](#root-motion)
    - [Update Loop](#update-loop)
  - [Movement](#movement-1)
    - [Turn Speed](#turn-speed)
  - [Camera](#camera-1)
    - [Cinemachine](#cinemachine-2)
    - [Post Processing](#post-processing)
  - [UI](#ui-1)
    - [Event System](#event-system)
    - [Canvas RenderMode Settings](#canvas-rendermode-settings)
    - [Strecth UI to entire screen](#strecth-ui-to-entire-screen)
    - [Implement a Timeout](#implement-a-timeout)
    - [Canvas Group](#canvas-group)
- [Unity Learn - 2D Character Controller](#unity-learn---2d-character-controller)

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

### SpriteTiling Instead of Streching

- Tile (Draw Multiple) Sprites instead of Stretching a tile on resizing
- Transform Scale 1 1 1
- SpriteRenderer Component DrawMode Tiled
- TileMode Adaptive
- Select Tile in ProjectWindow MeshType FullRect
- BoxCollide2D Enable AutoTiling to follow Sprite size
- **NOTE:** this only works with ```RectTool``` . NOT Scale Tool. Scale changes scale of the object not the tiling size.

### Animation

- The number in the top right corner of Controls shows the selected keyframe number
- Use record mode and Make changes for selected keyframe
- OR
- AddProperty in the Animation window
- Select keyframe and change property for selected keyframe

### Animator

- Layers are useful for 3D animations because they allow you to use animations on different parts of the character.
- Parameters are used by our scripts to give information to the Controller.
- Animation State Machine is a graph of all the states of your animations and how they transition from one to another.

#### Blend Trees

- RightClick in AnimationStateMachine CreateState FromNewBlendTree
- DoubleClick BlendTree
- Click on BlendTreeNode to open it in Inspector
- BlendType 2DSimpleDirectional
- Add Parameters in the AnimatorWindowLeftPane to work with
- SelectBlendTree Inspector ```+``` AddMotionField
- Drag AnimationClips into MotionField and set Variables accordingly

### Look Direction

#### Using Matf instead of ```==``` for equality checks

- ```Mathf.Approximately(move.x, 0.0f)```
- Use ```Mathf.Approximately``` instead of ```==``` because the way computers store float numbers means there is a tiny loss in precision.
- So you should never test for perfect equality because an operation that should end up giving 0.0f could instead give something like 0.0000000001f instead. Approximately takes that imprecision into account and will return true if the number can be considered equal minus that imprecision.

#### Normalizing Vectors

- The length of a Vector defines how long that arrow is. So, for example, a Vector2 equal to (0,-2) has a length of 2 and points down. If we normalize that Vector, it will become equal to (0,-1), so still pointing down but of length 1.
- In general, you will normalize vectors that store direction because length is not important, only the direction is.
- **NOTE:** You should never normalize a vector storing a position because as it changes x and y, it changes the position!

### Instantiate

```cs
GameObject exampleObject = Instantiate(GameObject, Vector2, Quaternion.identity);
```

#### Quaternions

- Quaternions are mathematical operators that can express rotation.
- Quaternion.identity means “no rotation”.

#### Awake

Rigidbody2d variable is empty (contains null), despite us getting the Rigidbody in Start.

That’s because Unity doesn’t run Start when you create the object, but on the next frame. So when you call Launch on your projectile, just Instantiate and don’t call Start, so your Rigidbody2d is still empty. To fix that, rename the void Start() function in the Projectile script to void Awake().

Contrary to Start, Awake is called immediately when the object is created (when Instantiate is called), so Rigidbody2d is properly initialized before calling Launch.

### Layers

Layers allow you to group GameObjects together so they can be filtered. Your aim is to make a Character layer to put your Ruby GameObject in, and a Projectile layer to put all your projectiles in.

Then you can tell your Physics System that the Character and Projectile layers can’t collide, so it will ignore all collisions between objects in those layers.

#### Layer Collision Matrix

Then open Edit > Project Settings > Physics 2D and look to the Layer Collision Matrix the part at the bottom, to see which layers collide with which

By default, all are ticked, so all layers collide with every other layer, but you want to uncheck the intersection between the Character row and Projectile column, so those two layers don’t collide anymore.

### RigidBody Simulation

```cs
rigidbody2D.simulated = false;
```

This removes the Rigidbody from the Physics System simulation, so it won’t be taken into account by the system for collision, and the fixed robot won’t stop the Projectile anymore or be able to hurt the main character.

### Projectile Cleanup

One minor issue with your current solution is that, if you get Ruby to throw the Cog and it doesn’t collide with anything, the Cog will keep on going outside of the screen for as long as the game runs.
As the game progresses, this could cause a performance problem if suddenly you have 500 cogs moving outside of the view.

```cs
void Update()
{
    if(transform.position.magnitude > 1000.0f)
    {
        Destroy(gameObject);
    }
}
```

There are other ways to handle this, depending on the game. For example, you could get the distance between the character and the cog (with the function Vector3.Distance (a,b) to compute the distance between the position a and position b).

Or you could use a timer in the Projectile script, so when the Cog is launched you set your timer to something like 4 seconds, you would decrement it in the Update function and then destroy the Cog when the timer reaches 0.

### Cinemachine

- Install package from Window PackageManager
- Cinemachine Create2DCamera

In 3D applications like Unity, cameras can have two modes:

1. Perspective: where all lines going away from the camera converge to a point, making things appear smaller as they get farther away from the camera. This is a bit like a straight road disappearing in the distance and its two sides seem to converge into a single point.
2. Orthographic: where all parallel lines stay parallel.

Orthographic size is simply how many units the camera fits in half of its height, because that’s how the camera works. So, because we set it to 5, we can see 10 units of the world in the vertical direction of the screen. Make sure you set the half height, so if you want your camera to be able to see 50 units of the world in its height, set it to 25.

Why are you setting the height and not the width? Well, this is because the width changes depending on the resolution the user sets for their game window. Screens can have a lot of resolution ratios, such as 4:3, 16:9 and 16:10, so the camera will show more or less of the world’s width depending on the screen shape, but it will always show the same vertical height.

#### Camera Bounds

- Add CameraConfiner Extension to Cinemachine Virtual Cam
- Create Empty GameObject
- Name it CameraConfiner
- Add Any Collider2D component and define bounds
- **TIP:** While editing polygon collider, delete a point (like the top one on pentagon) by pressing the ```delete``` key as you drag it.
- Drag CameraConfiner into Cinemachine BoundShape2D field
- Add a layer to CameraConfiner
- Remove all collisions to that layer in LayerCollisionMatrix to avoid player being pushed as camera collides with the Confiner

### Particle Effects

- Hierarchy Create Effects ParticleSystem
- TextureSheetAnimation Mode Sprites Add(+)Sprites
  - StartFrame Random 0 to 2
  - FrameOverTime Select Point in Graph and Delete second point to disable animation
- Shape
  - Set Radius Angle
- StartLifeTime
  - Random 1.5 to 3
- StartSize
  - Random 0.3 to 0.5
- StartSpeed
  - Random 0.5 to 1
- ColorOverTime
  - Change Alpha to 0 on TopRight selector for fade effect
- Size over time
  - Use Graph
- ParticleSystem
  - Simulation Space Local/Global
- Code
  
  ```cs
  public ParticleSystem smokeEffect;
  public void Fix()
    {
        smokeEffect.Stop();
    }
  ```

- Drag ParticleSystem from Hierarchy to Robot as it's child
- You may be wondering why the type is ParticleSystem and not Gameobject, since you are assigning a GameObject to it.
That’s because if a public member is a Component or Script type (instead of GameObject), when you assign a GameObject to it in the Inspector, Unity stores the component of the type that is on the GameObject.
- This prevents you from having to do GetComponent in the script like you did before. It also stops you from assigning a GameObject that doesn’t have that component type on it to that setting. This also avoids creating a bug by mistake.

#### OneTimeOnly Effects

- Untick Looping
- Set Duration
- StopAction Destroy
- Emission
  - RateOverTime 0
  - Set Burst at 0.0 Time
- Instatiate in Code
  
  ```cs
  public ParticleSystem damageEffect;
  void ChangeHealth(int amount){
    ParticleSystem damageEffectParticles = Instantiate(damageEffect, rigidbody2d.position + Vector2.up * 0.7f, Quaternion.identity);
  }
  ```

### UI

#### Canvas

- Create UI Canvas
- RenderMode
  - ScreenSpaceOverlay
  - ScreenSpaceCamera
  - WorldSpace
- **TIP:** Hold Shift while resizing to scale uniformly

#### Anchors

- AnchorPresets
  - Hold left while using AnchorPresets to stretch image

#### Sprit Masking

- Create UI Image
- Set Anchors
- Set Pivot
  - Resizing is made from the pivot
  - Ex: For health bar pivot set for left
- Add Image to be masked
  - Ex: Amount of health sprite
- Select Mask Object
  - Add MaskComponent
  - Uncheck ShowMaskGraphic
- Now Resizing MaskObject masks the Image
- Changing through script
  - Add Script to Image to be masked (child of the mask object)
  - Take MaskObject as public variable
  
    ```cs
      public Image mask;
      float originalSize;

      void Start()
      {
          originalSize = mask.rectTransform.rect.width;
      }

      public void SetValue(float value)
      {
          mask.rectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, originalSize * value);
      }
    ```

### NPC Dialogue

#### Canvas - World Space

Setting Canvas Size

- To set canvas of size 3 x 2 Unity units
- All UI elements (such as image and text) work in pixels, so a Canvas size of width 3 and height 2 would create a box of 3 by 2 pixels.
- Instead you will scale your Canvas, so the size in the Scene is reduced, but its width and height are kept to proper pixel values.
- Set your Rect Transform:
- Pos X and Pos Y to 0
- Width to 300 and Height to 200
- Then set the Scale to 0.01 in X, Y and Z
- Canvas exists in the Scene, so it’s like any other GameObject and can be rendered behind those GameObjects.
- To make sure nothing renders on top of your Canvas, set Order in Layer to a high value (for example, 10)
- UI Text TextMeshPro
- Import TMP Essentials

#### Raycast

- Use raycast from player to detect NPCs in range

  ```cs
  RaycastHit2D hit = Physics2D.Raycast(rigidbody2d.position + Vector2.up * 0.2f, lookDirection, 1.5f, LayerMask.GetMask("NPC"));
  ```

### Audio

- Add AudioSource Component To Game Object
- Drag Auido Clip
- Set Loop or No Loop
- Set 2D (plays everywhere) or 3D (plays only in a specific region)
- For 3D Set 3DSoundSettings Min/Max distance
- For Background Music
  - Create Empty GameObject BackgroundMusic
  - Add Audio Source Component
  - Enable Loop
  - Enable Play on Awake
- For Event Specific Audio

  ```cs
  AudioSource audioSource;

  void Start()
  {
    audioSource= GetComponent<AudioSource>();
  }

  public void PlaySound(AudioClip clip)
  {
    audioSource.PlayOneShot(clip);
  }
  ```

#### Camera Audio Fix for 2D games (Attenuation Fix)

Camera is at z = 10 units for 2D Games. Hence Spatial(3D) sounds cannot be heard because of attenuation along z axis

**FIX:**

- Create an EmptyObject as child to MainCamera as Listener
- Set transform to 0 0 10. Since positioning is relative to parent, position will be at z = 0 for the Listener
- Add AudioListener Component to Listener
- Remove AudioListener from MainCamera

### Build

---
---

## John Lemon

### Animations

#### Root Motion

Important Note!  The GameObject called Root in the JohnLemon Prefab’s hierarchy refers to the root of its skeleton, and is not the actual root GameObject.  The root GameObject is whichever GameObject the Animator component is on — in this case, the GameObject called JohnLemon.

#### Update Loop

An Animator component can change when it performs its Update. By default it performs this in line with rendering.  This means that the Animator is moving the character in Update and the Rigidbody is simultaneously moving the character in Fixed Update.  This is what’s causing your problem.

### Movement

:::note
:::
**NOTE:**This means that your character will move faster diagonally than it will along a single axis.  In order to make sure this doesn’t happen, you need to ensure the movement vector always has the same magnitude.  You can do this by normalizing it.  Normalizing a vector means keeping the vector’s direction the same, but changing its magnitude to 1.

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
