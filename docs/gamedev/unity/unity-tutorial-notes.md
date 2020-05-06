---
id: unity-tutorial-notes
title: Unity Tutorial Notes
sidebar_label: Unity Tutorial Notes
---

## Ruby's Adventure

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

## 2D Character Controller
