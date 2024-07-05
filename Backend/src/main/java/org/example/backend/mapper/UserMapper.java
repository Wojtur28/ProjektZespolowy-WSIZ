package org.example.backend.mapper;

import org.example.backend.user.UserEntity;
import org.mapstruct.Mapper;
import org.example.model.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity toEntity(User user);

    User toDto(UserEntity userEntity);

    List<User> toDto(List<UserEntity> userEntities);


}
