---
id: unity2d
title: Unity 2D
sidebar_label: Unity 2D
---

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