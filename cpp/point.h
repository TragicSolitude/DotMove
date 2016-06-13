#pragma once

#include <cmath>
#include <string>
#include <sstream>

class Point
{
public:
    float x_;
    float y_;

    Point()
    {
        x_ = 0;
        y_ = 0;
    }

    Point(float x, float y)
    {
        x_ = x;
        y_ = y;
    };

    float DistanceTo(Point other)
    {
        return sqrt(pow(other.x_ - x_, 2) + pow(other.y_ - y_, 2));
    };

    static float DistanceBetween(Point p1, Point p2)
    {
        return sqrt(pow(p2.x_ - p1.x_, 2) + pow(p2.y_ - p1.y_, 2));
    }

    std::string ToString(void)
    {
        std::ostringstream s;
        s << "Point: [" << x_ << ", " << y_ << "]";
        return s.str();
    };
};
