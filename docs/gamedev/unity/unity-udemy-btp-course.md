---
id: unity-udemy-btp-course
title: Udemy BTP Course
sidebar_label: Udemy BTP Course
---

## Creating Player

### Drawing

- Make rough prototypes
- Fix on a design
- Fix light source on a layer to make lights and shadows consitent consistent for all other drawings
- Use layers to seperately draw different parts
  - Use layers to add paint to each part
  - Merge outline and painted layer of each part
- Make a new image of all parts by copy pasting the parts from the layers
- Disable background layer for transparent background
- Export as PNG

### Importing

- Drag PNG into Unity
- SpriteMode Multiple
- FilterMode Point(NoFilter)
- SpriteEditor
- Draw Boxes to separate parts
- **TIP:** Use AlphaMode (Right of Apply button) for better view
- Set pivots (points where resizing and rotation are applied)
- Apply

### Rigging the Player

- Drag each part into scene view
- Arrange according to original image
- Set OrderInLayer
- Create EmptyObject Player
- Drag all parts as children into Player Object
- Parent each part in hierarchy (Ex: Head as parent to eyes) to use same pivot

### Animation

- Window Animation Animation
- Select Player in Hierarchy
- **NOTE:** DO NOT make changes to Player Object
- AnimationWindow CreateAnimation
- Use RecordMode
- Select a keyframe at 1:00
- Make Changes to parts
- **TIP:** Use ShiftClick to select multiple keyframes at that time point
- **TIP:** Use TopMost point to select all keyframes at that time point
- **TIP:** Use Space while mouse in timeline pane to Pause/Play
- **TIP:** Select multiple keyframes and drag to increase decrease speed of animation
- **TIP:** To Make Loop effect select all keyframes in first time point and paste it as a new last time point
- **TIP:** Properties show the variating keyframes in respective row
- **TIP:** Add Multiple overlapping subtle changes to make animation more interesting
- Run Animation
  - Move left leg up at 0:00 in timeline
  - At 0:10 move left leg down and right leg up
  - copy paste keyframes from first at end 0:20
  - To Avoid both legs being in the air at same time
    - Copy paste Right leg keyframes from 0:00 to 0:07
    - Copy paste Left leg keyframes from 0:10 to 0:17
    - Which makes one leg grounded before lifting other leg
  - Move the body down at 0:05, Up at 0:10, Down at 0:15

### Player Movement

### Animation Controller

- Window Animation Animator
- Parameters IsRunning
- **TIP:** Use Bool Parameters for looping animations. Use Triggers ans HasExitTime for one time animations
- Select Idle AddTransition to Run
- Conditions IsRunning True
- HasExitTime Disable
- **TIP:** TransitionDuration ```0.1```. Using 0 makes animation suddenly snap from one to another.
- Repeat for Run to Idle Transition
- Changing IsRunning through code
  
    ```cs
    if(moveInput != Vector2.zero){
        animator.SetBool("IsRunning", true);
    }else{
        animator.SetBool("IsRunning", false);

    }
    ```

### Weapon

- Draw different parts of weapon on different layers
- **TIP:** Glow effects can be added in Unity by adding Halo Component to sprite
- **NOTE:** ParticleSystem Shape Circle Set Rotation to 0 0 0
- **TIP:** EffectOverLifetime have predefined graphs to use below the graph editor

### Enemies

- Create Base Enemy class
- While creating specific enemy class import from Enemy class instead of MonoBehaviour
  
  ```cs
  public class MeleeEnemy : Enemy{

  }
  ```

  ### Drawing Tips

  - Draw on paper, Scan and use it as background layer
  - **TIP:** Use ClippingMasks to draw only on the layer
