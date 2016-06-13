#include <iostream>
#include <array>
#include <chrono>

#include "dot.h"

int main(void)
{
    std::array<Dot, DOT_COUNT> dots;

    std::cout << dots[0].ToString() << std::endl;
    std::cout << dots[1].ToString() << std::endl;
    std::cout << "Distance Between: " << Dot::DistanceBetween(dots[0], dots[1]) << std::endl;
};