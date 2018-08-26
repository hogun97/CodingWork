# Jolly Jumpers

## Introduction

Let us define that a number list with n (n>0) integers is "jolly" if the absolute differences between each adjacent pair of numbers contains all integers between 1 and n-1. 

For example, assume that we have the following integer list:

    list = [1 4 2 3]

Then, |list[0]-list[1]| |list[1]-list[2]| |list[2]-list[3]| --> 3 2 1 would be the absolute difference of the integer list [1 4 2 3]. In this case, [1 4 2 3] is jolly since its absolute difference list contains all integers between 1 and n-1.

Ex.)

    1 4 2 3 => Jolly
    1 4 2 -1 6 => Not Jolly
    11 7 4 2 1 6 => Jolly

## Problem

Create a function that determines whether an integer list is jolly or not.        

 
