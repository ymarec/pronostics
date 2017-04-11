package com.github.ymarec.pronostics.repository;

import com.github.ymarec.pronostics.domain.Equipe;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Equipe entity.
 */
@SuppressWarnings("unused")
public interface EquipeRepository extends JpaRepository<Equipe,Long> {

}
