package com.mahendra.ipldashboard.repository;

import java.util.List;

import com.mahendra.ipldashboard.model.Match;
import com.mahendra.ipldashboard.model.Team;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MatchRepository extends CrudRepository<Match, Long> {

  List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

  default List<Match> findLatestMatchesByTeam(String teamName, int count) {
    Pageable pageable = PageRequest.of(0, count);
    return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, pageable);
  }
  
}
