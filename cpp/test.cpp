#include <iostream>
#include <array>
#include <chrono>

#include "dot.h"

int main(void)
{
    std::chrono::time_point<std::chrono::high_resolution_clock> start, end;

    start = std::chrono::high_resolution_clock().now();
    std::array<Dot, DOT_COUNT> dots;

    std::cout << dots[0].ToString() << std::endl;
    std::cout << dots[1].ToString() << std::endl;
    std::cout << "Distance Between: " << Dot::DistanceBetween(dots[0], dots[1]) << std::endl;
    end = std::chrono::high_resolution_clock().now();

    std::cout << "Completed in: " << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() << "ms" << std::endl;
    // TODO Calculate average timing
};