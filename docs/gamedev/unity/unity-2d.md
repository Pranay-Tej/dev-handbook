---
id: unity-2d
title: 2D
sidebar_label: 2D
---

## Contents <!-- omit in toc -->

- [Player Movement](#player-movement)
  - [All possible methods](#all-possible-methods)
  - [Unity Microgame Platformer Method](#unity-microgame-platformer-method)
- [One Way Jumping Platform](#one-way-jumping-platform)
- [Ladder](#ladder)
  - [Using Raycast Method](#using-raycast-method)
  - [Using OnTrigger Methods](#using-ontrigger-methods)
  - [Ladder Top](#ladder-top)
- [Jump Pad](#jump-pad)
- [Moving Platform](#moving-platform)
- [Trap - Death From Above](#trap---death-from-above)

## Player Movement

### All possible methods

```cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Controller2D : MonoBehaviour
{
    public float horizontalMoveSpeed;
    public float jumpStrength;

    public bool isGrounded = true;

    private float horizontalMovementInput;
    private bool jumpInput = false;

    private Rigidbody2D rb;
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }


    void Update()
    {
        // Take Input in Update and Act Upon it in FixedUpdate

        horizontalMovementInput = Input.GetAxisRaw("Horizontal");

        if (Input.GetButtonDown("Jump"))
        {
            jumpInput = true;
        }

    }

    private void FixedUpdate()
    {
        // MoveHorizontalWithSmoothDamp(horizontalMovementInput);
        //! MoveHorizontalWithSmoothDampTwo(horizontalMovementInput);
        MoveHorizontalWithVelocity(horizontalMovementInput);
        // MoveHorizontalWithAddForce(horizontalMovementInput);
        //! MoveHorizontalWithMovePosition(horizontalMovementInput);
        //! MoveHorizontalWithTransformPosition(horizontalMovementInput);
        //! MoveHorizontalWithTransformTranslate(horizontalMovementInput);

        // JumpWithAddForce();
        // JumpWithSmoothDamping();
        JumpWithVelocity();

        FallFaster();
    }

    #region HorizontalMovement

    private Vector2 currentHorizontalVelocity = Vector2.zero;
    private float HorizontalMovementSmoothing = 0.01f;

    private float maxSpeed = 20f;

    // * Documentation
    //  Vector2 SmoothDamp(Vector2 current, Vector2 target, ref Vector2 currentVelocity, float smoothTime, float maxSpeed = Mathf.Infinity, float deltaTime = Time.deltaTime);
    private void MoveHorizontalWithSmoothDamp(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 20

        Vector2 targetVelocity = new Vector2(horizontalMovementInput * horizontalMoveSpeed, rb.velocity.y);
        rb.velocity = Vector2.SmoothDamp(rb.velocity, targetVelocity, ref currentHorizontalVelocity, HorizontalMovementSmoothing, maxSpeed, Time.deltaTime);

        // ? NOTE
        // Movement is similar to inertia and AddForce method?
    }

    private void MoveHorizontalWithSmoothDampTwo(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 15
        Vector2 currentHorizontalPosition = new Vector2(transform.position.x, transform.position.y);
        Vector2 targetHorizontalPosition = currentHorizontalPosition + new Vector2(horizontalMovementInput * horizontalMoveSpeed, 0);
        Vector2 currentHorizontalVelocityTwo = rb.velocity;
        rb.velocity = Vector2.SmoothDamp(currentHorizontalPosition, targetHorizontalPosition, ref currentHorizontalVelocityTwo, HorizontalMovementSmoothing, maxSpeed, Time.deltaTime);

        // ! TEST. DOES NOT WORK!
    }

    private void MoveHorizontalWithVelocity(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 500
        rb.velocity = new Vector2(horizontalMovementInput * horizontalMoveSpeed * Time.deltaTime, rb.velocity.y);
    }

    private void MoveHorizontalWithAddForce(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 55
        Vector2 horizontalMovement = new Vector2(horizontalMovementInput, 0.0f);
        rb.AddForce(horizontalMovement * horizontalMoveSpeed * Time.deltaTime, ForceMode2D.Impulse);

        // * NOTE
        // Movement feels laggy due to inertia
        // Player keeps moving even after releasing keys until other forces stop it
    }

    private void MoveHorizontalWithMovePosition(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 15
        Vector2 horizontalMovement = new Vector2(horizontalMovementInput, 0f);
        rb.MovePosition((Vector2)transform.position + (horizontalMovement * horizontalMoveSpeed * Time.deltaTime));

        // !! NOTE
        // ! Affects Gravity
        // Player falls slowly to ground and jump does not work
        // * According to Unity Docs
        // MovePosition is intended for use with kinematic rigidbodies.

    }

    private void MoveHorizontalWithTransformPosition(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 15
        Vector3 movement = new Vector3(horizontalMovementInput, 0.0f, 0.0f);
        transform.position += movement * horizontalMoveSpeed * Time.deltaTime;

        // !! NOTE
        // ! Object Colliders don't work at high speeds

    }

    private void MoveHorizontalWithTransformTranslate(float horizontalMovementInput)
    {
        // use horizontalMoveSpeed = 15
        Vector3 movement = new Vector3(horizontalMovementInput, 0.0f, 0.0f);
        transform.Translate(movement * horizontalMoveSpeed * Time.deltaTime, Space.World);


        // !! NOTE
        // ! Object Colliders don't work at high speeds

        // * Usage
        // Use where physics is not used
        // ex: Swiping between UI screens

    }

    // ? Make Player Kinematic
    // Add gravity by adding a downward velocity Physics2D.gravity.y
    private void MoveHorizontalWithKinematicBody(float horizontalMovementInput)
    {


    }

    #endregion



    #region Jump

    private void JumpWithAddForce()
    {
        // use jumpStrength = 1000
        if (jumpInput)
        {
            jumpInput = false;
            rb.AddForce(new Vector2(0f, jumpStrength * Time.deltaTime), ForceMode2D.Impulse);
        }
        // GravitScale for Player = 3

    }


    private Vector2 currentVerticalVelocity = Vector2.zero;
    private float VerticalMovementSmoothing = 0.01f;

    private void JumpWithSmoothDamping()
    {
        // use jumpStrength = 25
        if (jumpInput)
        {
            jumpInput = false;
            Vector2 targetVelocity = new Vector2(rb.velocity.x, jumpStrength);
            rb.velocity = Vector2.SmoothDamp(rb.velocity, targetVelocity, ref currentVerticalVelocity, VerticalMovementSmoothing, Mathf.Infinity, Time.deltaTime);
        }

    }

    private void JumpWithVelocity()
    {
        // use jumpStrength = 1000
        if (jumpInput)
        {
            jumpInput = false;
            Vector2 jump = new Vector2(rb.velocity.x, jumpStrength * Time.deltaTime);
            rb.velocity = jump;
        }

        // ? NOTE
        // Slows HorizontalSpeed abruptly when combined with HorizontalSmoothDamping

    }

    public float fallMultiplier;
    // use fallMultiplier = 2;

    public float lowJumpMultiplier;
    // use

    private void FallFaster()
    {
        // If player is falling (negative Y velocity)
        // Add additional downward velocity with increased gravitational force
        if (rb.velocity.y < 0)
        {
            rb.velocity += Vector2.up * Physics2D.gravity.y * fallMultiplier * Time.deltaTime;
        }
        else if (rb.velocity.y > 0 && !Input.GetButton("Jump"))
        {
            // if player just tapped jump button AND is NOT holding down
            // results in a smaller jump
            // Add additional downward velocity with slightly increased gravitational force
            rb.velocity += Vector2.up * Physics2D.gravity.y * lowJumpMultiplier * Time.deltaTime;
        }
    }

    #endregion


}

```

### Unity Microgame Platformer Method

- Use kinematic object and add gravity manually ?? Physics2D.gravity

---

## One Way Jumping Platform

- Source: BalckThornProd YouTube Channel
- Create a sprite with 16 x 4 pixels
- Use 8 PixelPerUnit in Unity to make the platform thinner than normal platforms
- Use MeshType FullRect
- Drag into Scene
- Change DrawMode Tiled
- TileMode Adaptive
- Now Tile can be resized using the RectTool
- Add BoxCollider2D
- Enable AutoTiling
- Add PlatformEffector2D Component
- Enable UseByEffector in BoxCollider2D

    ```cs
    public class OneWayPlatform : MonoBehaviour
    {
        private float keyHoldTime = 0.2f;

        private float keyHoldTimer;

        private PlatformEffector2D platformEffector2D;

        void Start()
        {
            platformEffector2D = GetComponent<PlatformEffector2D>();
        }

        void Update()
        {
            if(Input.GetKeyUp(KeyCode.S)){
                // if player releases the down key
                // reset the timer
                keyHoldTimer = keyHoldTime;
            }

            if (Input.GetKey(KeyCode.S))
            {
                if (keyHoldTimer <= 0)
                {
                    // if the player holds the key for long enough disable the platform
                    platformEffector2D.rotationalOffset = 180f;
                    keyHoldTimer = keyHoldTime;
                }
                else
                {
                    // count the time player has held the key
                    keyHoldTimer -= Time.deltaTime;
                }
            }

            if(Input.GetButtonDown("Jump") || Input.GetKeyDown(KeyCode.W)){
                // reset the platform whenever player wants to jump
                // or if the player is climbing a ladder
                // reset the top of ladder
                platformEffector2D.rotationalOffset = 0f;
            }
        }
    }
    ```

---

## Ladder

### Using Raycast Method

- Source: BlackThornProd YouTube Channel
- Create a Sprite 16 x 4 pixels
- Use 8 PixelPerUnit in Unity
- Use MeshType FullRect
- Drag into Scene
- Change DrawMode Tiled
- TileMode Adaptive
- Drag vertically to elongate the ladder
- Add BoxCollider2D
- Enable AutoTiling
- Enable IsTrigger
- Create and add Ladder Layer
- Cast a ray from player foot and check if it collides with the ladder

    ```cs
    public float climbSpeed;
    private bool isClimbing = false;
    public float ladderCheckDistance;
    public LayerMask whatIsLadder;
    public Transform feetPosition;
    void Update()
    {
        inputVerticalRaw = Input.GetAxisRaw("Vertical");

        if (Input.GetButtonDown("Jump"))
        {
            isClimbing = false;
        }

    }
    private void FixedUpdate()
    {
        ClimbLadder();
    }
    private void ClimbLadder(){
        RaycastHit2D checkForLadder = Physics2D.Raycast(feetPosition.position, Vector2.up, ladderCheckDistance, whatIsLadder);

        if(checkForLadder.collider != null){
            if(inputVerticalRaw != 0){
                isClimbing = true;
            }
        }else{
            isClimbing = false;
        }

        if(isClimbing && checkForLadder.collider != null){
            rb.gravityScale = 0;
            rb.velocity = new Vector2(rb.velocity.x, inputVerticalRaw * climbSpeed);
        }else{
            rb.gravityScale = 3;
        }
    }
    ```

### Using OnTrigger Methods

- Create a Sprite 16 x 4 pixels
- Use 8 PixelPerUnit in Unity
- Use MeshType FullRect
- Drag into Scene
- Change DrawMode Tiled
- TileMode Adaptive
- Drag vertically to elongate the ladder
- Add BoxCollider2D
- Enable AutoTiling
- Enable IsTrigger
- Add a script Ladder to trigger ```isOnLadder```
  
```cs title="Ladder.cs"
private void OnTriggerEnter2D(Collider2D collider) {
    if(collider.tag == "Player"){
        collider.GetComponent<CharacterController2D>().isOnLadder = true;
        collider.GetComponent<CharacterController2D>().chainPosition = transform;
    }
}

private void OnTriggerExit2D(Collider2D collider) {
    if(collider.tag == "Player"){
        collider.GetComponent<CharacterController2D>().isOnLadder = false;
    }
}
```

- Use ```isOnLadder``` in PlayerController

```cs title="PlayerController"
public bool isOnLadder = false;
public float climbSpeed;
private bool isClimbing = false;
private float normalGravityScale;
public Transform chainPosition;

// check
public bool groundCheck;



void Start()
{
    normalGravityScale = rb.gravityScale;
}
void Update()
{
    inputVerticalRaw = Input.GetAxisRaw("Vertical");

    if (Input.GetButtonDown("Jump"))
    {
        isClimbing = false;
    }

    // checks
    groundCheck = Physics2D.OverlapCircle(feetPosition.position, checkRadius, whatIsGround);

    if(groundCheck){
        isClimbingChain = false;
    }
}
private void FixedUpdate()
{
    ClimbLadder();
}
private void ClimbLadder(){
    if(isOnLadder){
        if(inputVerticalRaw != 0){
            isClimbingLadder = true;
        }
    }else{
        isClimbingLadder = false;
    }

    if(isClimbingLadder){
        // if Player is climbing auto center with ladder
        transform.position = new Vector3(chainPosition.position.x, transform.position.y, transform.position.z);

        rb.gravityScale = 0f;
        rb.velocity = new Vector2(0, inputVerticalRaw * climbSpeed);
    }else{
        // reset gravity scale
        rb.gravityScale = normalGravityScale;
    }
}
```

### Ladder Top

- Create an empty game object
- Add BoxCollider2D
- Add PlatformEffector2D
- Add LadderTop Script as component

```cs title="LadderTop"
// components
private PlatformEffector2D platformEffector2D;

// inputs
private float inputVertical;

void Start()
{
    platformEffector2D = GetComponent<PlatformEffector2D>();
}

void Update()
{

    inputVertical = Input.GetAxis("Vertical");

    if (inputVertical < 0)
    {
        // when player wants to climb down the ladder
        platformEffector2D.rotationalOffset = 180f;
    }

    if(Input.GetButtonDown("Jump") || inputVertical > 0){
        // reset the platform whenever player wants to jump
        // or if the player is climb up the ladder
        // reset the top of ladder
        platformEffector2D.rotationalOffset = 0f;
    }
}
```

---

## Dash

```cs title="PlayerController"
// dash

public float dashSpeed;
public float dashDuration;
private float dashDurationCounter;
public float dashCooldown;
private float dashCooldownCounter;
private bool isDashing = false;

// inputs
private bool inputDash = false;

void Update(){
    // ! Input.GetButtonDown is not working properly
    // ! Input.GetButton results in glitch where holding shift key moves player at high speed continuously
    if (Input.GetButton("Dash"))
    {
        inputDash = true;
    }else{
        inputDash = false;
    }
}

private void FixedUpdate()
{
    // dash
    AttemptDash();
    Dash();
}

private void AttemptDash(){
    // Debug.Log("rate " + dashCooldownCounter);

    if(dashCooldownCounter > 0){
        dashCooldownCounter -= Time.deltaTime;
        // if(dashCooldownCounter == 0){
        //     dashCooldownCounter = 0;
        // }
        return;
    }

    if(inputDash){
        // Debug.Log("Dash");
        isDashing = true;
        dashCooldownCounter = dashCooldown;
        // dashDurationCounter = 0;
    }

}

private void Dash(){
    // Debug.Log("duration " + dashDurationCounter);
    // Debug.Log("isDash " + isDashing);

    if(!isDashing){
        return;
    }

    if(dashDurationCounter >= dashDuration){
        isDashing = false;
        dashDurationCounter = 0;
        return;
    }

    dashDurationCounter += Time.deltaTime;

    // reset horizontal velocity before adding dash force
    // rb.velocity = new Vector2(0, rb.velocity.y) * Time.deltaTime;
    Vector2 dash = new Vector2(dashSpeed, 0) * Time.deltaTime;
    rb.gravityScale = 0;
    if(!facingRight){
        dash = dash * (-1);
    }
    rb.velocity = dash;

}

```

---

## Jump Pad

---

## Moving Platform

- Create Empty GameObject MovingPlatform
- Create Platform GameObject as its child
- Add sprite to Platform
- Add Moving Platform Script to Platform
- Add Nodes (Empty GameObjects) as children to MovingPlatform GameObject
- Add icons to Nodes in the top left corner of Inspector for better view
- Drag all Nodes into Platform script 'stops' array
- Set RotationType

```cs title="MovingPlatform"
public float speed;

public float waitTime;

public enum RotationType
{
    Loop,
    ToAndFro
}
public RotationType rotationType;
public Transform[] stops;
private Transform nextStop;
private int currentStop = 0;
private bool toAndFroModeMovingForward = true;

private float waitTimeCounter;

void Start()
{
    if(stops.Length != 0){
        nextStop = stops[0];
    }
}

void Update()
{
    if(Vector2.Distance(transform.position, nextStop.position) > 0){
        transform.position =  Vector2.MoveTowards(transform.position, nextStop.position, speed * Time.deltaTime);
    }else{
        ChangeTarget();
    }
}

private void ChangeTarget(){

    if(waitTimeCounter < waitTime){
        waitTimeCounter += Time.deltaTime;
        return;
    }

    // reset waitTimeCounter
    waitTimeCounter = 0;

    // For Loop Rotation
    // 0 1 2 3 0 1 2 3
    if(rotationType == RotationType.Loop){
        currentStop = (currentStop + 1) % stops.Length;
        nextStop = stops[currentStop];
    }

    // For ToAndFro Rotation
    // 0 1 2 3 3 2 1 0
    if(rotationType == RotationType.ToAndFro){
        if(currentStop == 0){
            // move forward 0 1 2
            toAndFroModeMovingForward = true;
        }

        if(currentStop == stops.Length - 1){
            // move backward 2 1 0
            toAndFroModeMovingForward = false;
        }

        if(toAndFroModeMovingForward){
            currentStop ++;
        }else{
            currentStop --;
        }

        nextStop = stops[currentStop];
    }
}

private void OnCollisionEnter2D(Collision2D collision) {
    collision.collider.transform.parent = transform;
}

private void OnCollisionExit2D(Collision2D collision) {
    collision.collider.transform.parent = null;
}
```

---

## Self Destroying Platform

- Create a SelfDestroyingPlatform Sprite
- Add Script

```cs title="SelfDestroyingPlatform"
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SelfDestroyingPlatform : MonoBehaviour
{
    public float destroyAfter;
    private void OnCollisionEnter2D(Collision2D collision) {
        if(collision.collider.tag == "Player"){
            Destroy(gameObject, destroyAfter);
        }
    }
}
```

---

## Trap - Death From Above

---
