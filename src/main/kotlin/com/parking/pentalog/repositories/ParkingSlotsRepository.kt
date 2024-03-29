package com.parking.pentalog.repositories

import com.parking.pentalog.entities.ParkingSlots
import org.springframework.data.jpa.repository.JpaRepository


interface ParkingSlotsRepository: JpaRepository<ParkingSlots, Int> {
    fun findByIsOccupiedFalse() : List<ParkingSlots>
    fun findByUsersIdAndIsOccupiedTrue(id: Int) : ParkingSlots?
}