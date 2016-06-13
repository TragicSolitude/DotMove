#pragma once

#define _USE_MATH_DEFINES

#include <iostream>
#include <cmath>
#include <random>
#include <chrono>
#include <string>
#include <sstream>

#include "constants.h"
#include "point.h"
#include "velocity.h"

class Dot: public Point
{
public:
    // TODO Track current Dots and remove them from the array in destructor
    // static int all_dots_index;
    // static Dot all_dots_[DOT_COUNT];

    static std::default_random_engine random_engine;
    static std::uniform_real_distribution<> random;
    
    // The percentage of velocity retained after a collision
    // Ex: bounce_ of 0.4 retains 40% of the velocity after colliding with a wall or another Dot
    float bounce_;
    Velocity velocity_;

    Dot(): Point(random(random_engine) * WIDTH, random(random_engine) * HEIGHT)
    {
        float direction = random(random_engine) * (float) M_PI * 2;
        float speed = 4;

        velocity_ = Velocity {
            (float) cos(direction) * speed, // x_delta
            (float) sin(direction) * speed  // y_delta
        };
        bounce_ = 0.7;
    }

    Dot(float x, float y, float direction,  float speed, float bounce): Point(x, y)
    {
        velocity_ = Velocity {
            (float) cos(direction) * speed, // x_delta
            (float) sin(direction) * speed  // y_delta
        };
        bounce_ = bounce;
    };

    void Update(void)
    {
        // Check for wall collisions
        if (x_ < 0 || WIDTH < x_)
        {
            x_ = (velocity_.x_delta > 0 ? WIDTH - 1 : 1);
            velocity_.x_delta *= -1 * bounce_;
        }
        if (y_ < 0 || HEIGHT < y_)
        {
            y_ = (velocity_.y_delta > 0 ? HEIGHT - 1 : 1);
            velocity_.y_delta *= -1 * bounce_;
        }

        // TODO Dot collisions

        // Add friction and gravity
        if (velocity_.x_delta > 0)
        {
            velocity_.x_delta -= FRICTION;
        }
        else
        {
            velocity_.x_delta += FRICTION;
        }

        if (velocity_.y_delta > 0)
        {
            velocity_.y_delta += GRAVITY - FRICTION;
        }
        else
        {
            velocity_.y_delta += GRAVITY + FRICTION;
        }
    };

    std::string ToString(void)
    {
        std::ostringstream s;
        s << "Dot at [" << x_ << ", " << y_ << "]; X Delta: " << velocity_.x_delta << ", Y Delta: " << velocity_.y_delta;
        return s.str();
    };
};

// Initialize the random number generator

// random_device is a fixed number in Windows so we'll use a time seed for now
// std::random_device rd;
// std::default_random_engine Dot::random_engine(rd());
std::default_random_engine Dot::random_engine(std::chrono::system_clock::now().time_since_epoch().count());
std::uniform_real_distribution<> Dot::random(0, 1);