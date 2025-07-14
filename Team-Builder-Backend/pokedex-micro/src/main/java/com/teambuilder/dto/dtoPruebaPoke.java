package com.teambuilder.dto;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Entity
@Table(name= "pokemon")
@Log4j2
@Data
@AllArgsConstructor
@NoArgsConstructor
public class dtoPruebaPoke {
	
	@Id
	private int id;

	private String name;
	private int hp;
	private int attack;
	private int defense;
	private int special_attack;
	private int special_defense;
	private int speed;
}
