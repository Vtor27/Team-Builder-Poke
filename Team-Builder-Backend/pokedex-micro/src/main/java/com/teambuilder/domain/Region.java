package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "region")
@Getter
@Setter
@ToString(exclude = {"originRegion"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Region {
	
	@Id
	@EqualsAndHashCode.Include
	private Integer id;
	
	@EqualsAndHashCode.Include
	private String name;

//	@OneToMany(mappedBy = "region")
//	private Set<RegionApparitions> regionApparitions = new HashSet<>();

	@OneToMany(mappedBy = "regionOrigin")
	private List<Pokemon> originRegion;
}

